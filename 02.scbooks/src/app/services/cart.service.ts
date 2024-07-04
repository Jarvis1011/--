import { filter } from 'rxjs/operators';
import { limit } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { CartDataService, Book } from './cart-data.service';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserService } from './user.service';
import { OrderDataService } from './order-data.service';
import { DataService } from './data.service';
import { DiscountData, DiscountService } from './discount.service';
import { ShippingFeeService } from './shipping-fee.service';
import { CouponData, CouponService } from './coupon.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';

//購物車項目
export class CartItem {
  book: Book = new Book();
  discountData: DiscountData | undefined = new DiscountData();
  count: number = 0;
  subTotal: number = 0;
  selected: boolean = false;
}

//列舉資料
export enum PayType {
  ATM = 'ATM 轉帳',
  POST_OFFICE = '郵政劃撥',
  CREDIT_CARD = '信用卡',
  CONVENIENCE_STORE = '超商取貨付款',
}

//收件人
export class Receiver {
  realname: string = '';
  cellphone: string = '';
  email: string = '';
  city: string = '';
  address: string = '';
}

//各欄位在哪種結帳方式是必須的，列在陣列中的是非必要欄位
export class NotRequiredReceiverData {
  realname: Array<string> = [];
  cellphone: Array<string> = [];
  email: Array<string> = [];
  city: Array<string> = [PayType.CONVENIENCE_STORE];
  address: Array<string> = [PayType.CONVENIENCE_STORE];
}

export class OrderCoupon {
  usedBy: string = '';
  value: number = 0;
}

//列舉資料
export enum OrderStatus {
  CANCELED = '訂單取消',
  PROCESSING = '處理中',
  PAYED_DELIVERING = '已收款，已出貨',
  PAYED_NOTIFY = '已收款，通知出貨中',
  PAYED_RESUPPLY = '已收款，缺書補貨中',
  PAYED_DELIVERING_RESUPPLY = '已收款，已出貨(部份缺書補貨中)',
  GETORDER_NOTIFY = '已收訂單，通知出貨中',
  DELIVERING = '已出貨',
  FAILED = '交易失敗',
  NOT_PAYED = '尚未收到付款',
}

//訂單
export class Order {
  cart: Array<CartItem> = [];
  productTotalPrice: number = 0;
  shippingFee: number = 0;
  orderTotalPrice: number = 0;
  orderTime: string = '';
  orderStatus: string = '處理中';
  payed: boolean = false;
  payType: string = '';
  receiver: Receiver = new Receiver();
  userid: string = '';
  coupon: OrderCoupon = new OrderCoupon();
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private uploadOrderAPI: string = environment.ApiUrl + 'api/order.aspx';
  private userAPI = environment.ApiUrl + 'api/MemberUser.aspx';

  config!: any;

  //日期格式
  dateFormat = 'YYYY-MM-DD';

  cart: Array<CartItem> = [];
  order: Order;

  //給伺服器的訂單資料
  orderToServer: any;

  //顯示用的總數量
  countTotal: number = 0;

  //運費
  carriage: number = 0;

  //https://ithelp.ithome.com.tw/articles/10188677
  //如果有新的訂閱，能立即給出最新的值
  countTotal$!: BehaviorSubject<number>;

  //目前的付款類型，如果有新的訂閱，能立即給出最新的值
  payType$!: BehaviorSubject<string>;

  //使用者是否登入
  isLogin: boolean = false;

  //非必要的收件人資料
  notRequiredReceiverData: NotRequiredReceiverData =
    new NotRequiredReceiverData();

  //所有書都要能用折價券才能啟用
  allNotUseCoupon = false;

  //折價券
  coupon!: CouponData;
  originalPrice: number = 0;

  isCouponBook = false;
  filteredBook!: Book;
  // 折抵書原價格
  couponBookPrice: number = 0;

  constructor(
    private http: HttpClient,
    private cs: ConfigService,
    private cd: CartDataService,
    private ss: StorageService,
    public us: UserService,
    private os: OrderDataService,
    private ds: DataService,
    public dis: DiscountService,
    public shs: ShippingFeeService,
    private cp: CouponService
  ) {
    //取得組態檔
    this.cs.config$.subscribe((r) => (this.config = r));

    //使用者資訊
    this.us.isLogin$.subscribe((r) => {
      this.isLogin = this.us.isLogin;
    });

    //建立訂單
    this.order = new Order();

    //初始值
    this.countTotal$ = new BehaviorSubject(this.countTotal);
    this.payType$ = new BehaviorSubject(this.order.payType);

    this.allNotUseCoupon = false;
  }

  // 本地端取資料 ********** */
  //由 app.component 呼叫
  startFromLocal() {
    //取得截止日期
    var expiredDateStr = this.ss.getItem(StorageService.CART_EXPIRED_DATE);

    if (
      expiredDateStr &&
      moment(expiredDateStr).isAfter(moment().format(this.dateFormat))
    ) {
      //本地端未過期，資料可用

      // 取得本地端資料
      this.cart = JSON.parse(this.ss.getItem(StorageService.CART) as string);
    } else {
      // console.log("已過期，清空！");
      this.cart = [];
    }

    //連結訂單中的購物車資料
    this.order.cart = this.cart;

    this.updateCart();

    // console.log(this.notRequiredReceiverData);
  }

  //新增書本到購物車
  addToCart(bookdata: any, discountData: DiscountData) {
    var newBook = this.cd.transformData(bookdata);

    // console.log('add to cart:', bookdata, discountData);

    //若購物車中有相同的書，數量加 1；否則新增 1 本書
    var sameBookItem: Array<CartItem> = this.cart.filter(
      (item: CartItem, index: number) => {
        return newBook.id == item.book.id;
      }
    );

    if (sameBookItem.length > 0) {
      sameBookItem[0].count += 1;
    } else {
      this.cart.push({
        book: newBook,
        discountData: discountData,
        count: 1,
        subTotal: 0,
        selected: false,
      });
    }

    //計算商品總數
    this.updateCart();

    // console.log(this.cart, this.countTotal);
  }

  //刪除項目
  deleteCartItem(item: CartItem) {
    var delIndex = -1;
    this.cart.forEach((value: CartItem, i: number) => {
      if (item.book.id == value.book.id) {
        delIndex = i;
      }
    });

    if (delIndex !== -1) {
      this.cart.splice(delIndex, 1);
    }

    //更新資料
    this.updateCart();
  }

  //vip項目
  selectCartItem(item: CartItem) {
    const selectedItems = this.cart.filter(
      (cartItem) => cartItem.selected
    ).length;
    const limitCount = this.config.vipDiscount.max;
    if (item.selected) {
      // 若選取項目已達到限制數量，直接禁用未選項目
      if (selectedItems > limitCount) {
        item.selected = false;
      }
    }
  }

  //決定單價
  getFinalPrice() {
    //有登入使用特價，未登入使用定價
    /* this.cart.forEach((item: CartItem, index: number)=>{
			item.book.priceFinal = this.isLogin? item.book.priceSpecial : item.book.price;
		}); */
    //修正：無登入也有特價
    // this.cart.forEach((item: CartItem, index: number) => {
    //   item.book.priceFinal = item.book.priceSpecial;
    // });
    //新增vip價
    this.cart.forEach((item: CartItem, index: number) => {
      // item.book.priceFinal = item.book.priceSpecial;
      if (this.us.user?.isVip) {
        // 變VIP的價格
        item.book.priceFinal = item.book.priceVip;
      } else {
        item.book.priceFinal = item.book.priceSpecial;
      }
    });
  }

  //小計
  calcSubTotal() {
    // 原小記計算方式
    // this.cart.forEach((item: CartItem, index: number) => {
    //     item.subTotal = item.book.priceFinal * item.count;
    // });

    // 加入VIP價的計算規則
    this.cart.forEach((item: CartItem, index: number) => {
      if (item.count === undefined || item.count === null) {
        item.count = 0; // 設置默認值
      }
      if (item.selected) {
        if (item.book.priceSpecial > this.config.vipDiscount.value) {
          item.subTotal = Math.max(
            item.book.price * this.config.vipDiscount.min -
              this.config.vipDiscount.value +
              item.book.priceFinal * (item.count - this.config.vipDiscount.min),
            0
          );
        } else {
          item.subTotal = Math.max(
            item.book.priceFinal * (item.count - this.config.vipDiscount.min),
            0
          );
        }
        // if (item.count > this.config.vipDiscount.min) {
        //   item.subTotal = Math.max(
        //     item.book.priceFinal * (item.count - this.config.vipDiscount.min),
        //     0
        //   );
        //   console.log(item.subTotal);
        // } else {
        //   item.subTotal = Math.max(
        //     item.book.priceFinal * item.count - this.config.vipDiscount.value,
        //     0
        //   );
        // }
      } else {
        item.subTotal = item.book.priceFinal * item.count;
      }
      // console.log(item.count);
    });
  }

  //總計
  calcTotal() {
    var sum = 0;
    var subtotalSum = 0;
    var discountItemPrice = 0;
    var allNotUseCoupon = true;
    this.cart.forEach((item: CartItem, i: number) => {
      //折價券在此套用，算運費前折抵
      // console.log("計算折價：", this.cart);
      discountItemPrice = item.subTotal;
      sum += item.subTotal;
      subtotalSum += item.subTotal;
      if (this.cp.couponCanBeUsed) {
        this.cp.checkCoupon$(this.cp.couponID).subscribe((r) => {
          if (r[0]) {
            this.coupon = this.cp.transformData(r[0]);
            // console.log(this.coupon);
            // console.log(item.book.id === this.coupon.cBookNum, i);

            if (this.coupon.cBookNum == '') {
              if (this.coupon.cDiscount !== 0) {
                // 使用折扣比例计算折扣金额
                sum = subtotalSum * this.coupon.cDiscount;
                this.order.productTotalPrice = sum;
              }

              if (this.coupon.cDiscountPrice !== 0) {
                // 使用固定折扣金额
                if (this.coupon.cDiscountPrice <= subtotalSum) {
                  sum = subtotalSum - this.coupon.cDiscountPrice; // 減去折價金額
                } else {
                  sum = 0; // 折價金額大於商品總價，將 sum 設為 0
                }
                this.order.productTotalPrice = sum;
              }
              this.order.productTotalPrice = sum;
              this.calcOrderPrice(sum);
              this.calcShippingFee(sum);
            } else if (this.coupon.cBookNum !== '') {
              if (item.book.id === this.coupon.cBookNum) {
                // 使用折扣比例計算折扣金額
                if (this.coupon.cDiscount !== 0) {
                  discountItemPrice =
                    item.subTotal - item.subTotal * this.coupon.cDiscount;
                  sum = subtotalSum - discountItemPrice;
                }

                // 使用固定折扣金額
                if (this.coupon.cDiscountPrice !== 0) {
                  if (this.coupon.cDiscountPrice <= item.subTotal) {
                    sum = subtotalSum - this.coupon.cDiscountPrice;
                  } else {
                    sum = subtotalSum - discountItemPrice;
                  }
                }
              }
              this.order.productTotalPrice = sum;
              this.calcOrderPrice(sum);
              this.calcShippingFee(sum);
            }
          }
        });
      }

      this.order.productTotalPrice = sum;
      // 計算完總計後，調用calcOrderPrice()函數並傳遞總計的價格
      this.calcOrderPrice(sum);
      this.calcShippingFee(sum);
      this.originalPrice = subtotalSum;
      // sum += item.subTotal;
      // console.log("總計中本產品不適用折價券：", item.discountData?.discoupon);
      allNotUseCoupon =
        allNotUseCoupon && (item.discountData?.discoupon as boolean);
    });

    //計算所有書都能使用折價券
    this.allNotUseCoupon = allNotUseCoupon;
    // console.log("總計-->不適用折價券：", this.allNotUseCoupon);

    // 舊折價券公式
    // sum += this.config.couponValue;
    // console.log(this.originalPrice);

    // 計算完總計後，調用calcOrderPrice()函數並傳遞總計的價格
    // this.calcOrderPrice(sum);
    // this.calcShippingFee(sum);
    // this.order.productTotalPrice = sum;
  }

  //計算運費
  calcShippingFee(productTotalPrice: number) {
    //取得目前運費
    var feeArray: Array<any> = this.shs.getCurrentShippingFee(this.config);

    // console.log(this.shs.getUsedVipCouponShippingFee(this.config));
    // console.log("計算運費，total：", this.order.productTotalPrice);

    var fee = 0;
    var total = productTotalPrice;
    // console.log(this.cart.some((item) => item.selected));
    // console.log(total);

    // 計算當有使用VIP優惠時運費改為100元
    if (this.cart.some((item) => item.selected)) {
      feeArray = this.shs.getUsedVipCouponShippingFee(this.config);
      feeArray.forEach((feeObj) => {
        if (total >= feeObj.min && total <= feeObj.max) {
          fee = feeObj.value;
        }
      });
    } else {
      // 原運費計算方式
      feeArray.forEach((feeObj, index) => {
        if (total >= feeObj.min && total <= feeObj.max) {
          fee = feeObj.value;
        }
      });
    }

    // feeArray.forEach((feeObj, index) => {
    //   if (total >= feeObj.min && total <= feeObj.max) {
    //     fee = feeObj.value;
    //   }
    // });

    this.order.shippingFee = fee;
  }
  //計算訂單費用
  calcOrderPrice(productTotalPrice: number) {
    this.order.orderTotalPrice = productTotalPrice + this.order.shippingFee;
    // console.log(productTotalPrice);
  }

  //產生訂單時間
  addOrderTime() {
    this.order.orderTime = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  //記錄會員id
  addUserID() {
    this.order.userid = this.us.user?.account ? this.us.user.account : '';
  }

  //記錄折價券資料
  addCoupon() {
    var subTotal = 0;
    // this.cp.checkCoupon$(this.cp.couponID).subscribe((r) => {
    //   subTotal =
    //     r[0].cDiscount === 0
    //       ? r[0].cDiscount.toFixed(3)
    //       : r[0].cDiscountPrice === 0
    //       ? r[0].cDiscount.toFixed(3)
    //       : r[0].cDiscountPrice;
    //   // console.log(subTotal);
    //   this.order.coupon.value = subTotal;
    // });
    this.order.coupon.usedBy = this.us.user?.realname as string;
  }

  //儲存本地端
  saveLocalData() {
    this.ss.setItem(StorageService.CART, JSON.stringify(this.cart));
    this.ss.setItem(
      StorageService.CART_EXPIRED_DATE,
      moment().add(this.config.localCartDays, 'days').format(this.dateFormat)
    );
  }

  //購物車內容發生變化
  updateCart() {
    // 計算商品總數
    this.countTotal = this.cart.reduce((pre, ele) => pre + ele.count, 0);
    //決定單價
    this.getFinalPrice();
    //小計
    this.calcSubTotal();
    //總計
    this.calcTotal();
    //計算運費
    this.calcShippingFee(this.order.productTotalPrice);
    //計算訂單費用
    this.calcOrderPrice(this.order.productTotalPrice);

    //儲存本地端
    this.saveLocalData();
    //發出通知
    this.countTotal$.next(this.countTotal);

    //訂單
    // console.log("訂單變化：", this.order);
  }

  //更新收件人
  updateReceiver(formValue: any) {
    for (var prop in this.order.receiver) {
      (this.order.receiver as any)[prop] = formValue[prop];
    }
  }

  //檢查表單欄位是否必須
  isReceiverDataRequired(control: string, currentPayType: string) {
    return (
      (this.notRequiredReceiverData as any)[control]?.indexOf(currentPayType) <
      0
    );
  }

  //清除圖片路徑（節省空間和時間）
  deleteImg() {
    // console.log(this.cart);
    // this.cart.forEach((item, index)=>{
    // 	delete item.book.img;
    // 	delete item.book.priceVip;
    // 	delete item.discountData;
    // });
  }

  //初始化訂單狀態
  iniOrderState() {
    this.order.orderStatus = OrderStatus.PROCESSING;
  }

  //轉換給伺服器的資料
  transformOrderData() {
    this.orderToServer = this.os.transformDataToServer(this.order);
  }

  //上傳訂單
  uploadOrder$(): Observable<Object> {
    var postUrl = new URL(this.uploadOrderAPI);
    var orderObj = this.orderToServer;

    // console.log('上傳 + 簡化前：', orderObj);

    //減少不必要欄位資料，不然資料庫欄位存不下
    orderObj = this.reduceData(orderObj);

    var postParams = new URLSearchParams(orderObj);
    postUrl.search = postParams.toString();

    // console.log('upload:', JSON.stringify(orderObj));
    // console.log('upload:', orderObj);

    console.log('參數：', postUrl.href);

    //test
    // var test = new Observable<Object>();
    // return test;

    return this.ds
      .get(postUrl.href)
      .pipe

      //回傳結果：[{"DataCheck":"OK","DataDesc":"更新成功"}]
      // map( (r:any) => r[0].DataCheck),

      // debug
      // tap( r => console.log("上傳結果:", r) ),
      ();
  }
  reduceData(orderObj: any): any {
    var temp = orderObj;
    var books: Array<any> = JSON.parse(orderObj.ProdTitle);

    books.forEach((item: any) => {
      // console.log(item);

      delete item.book.img;
      delete item.book.priceVip;
      delete item.book.priceSpecial;
      delete item.book.price;
      delete item.book.priceFinal;
      delete item.book.pubdate;
      delete item.book.status;
      delete item.discountData;
      delete item.selected;
    });

    //增加折扣資料及運費
    if (this.cp.couponCanBeUsed) {
      books.push({
        book: { name: '折價券 ' + this.cp.usedCoupon.cNumber },
        count: 1,
        subTotal:
          this.cp.usedCoupon.cDiscountPrice || this.cp.usedCoupon.cDiscount,
      });
    }
    books.push({
      book: { name: '運費' },
      count: this.order.shippingFee > 0 ? 1 : 0,
      subTotal: this.order.shippingFee,
    });

    orderObj.ProdTitle = JSON.stringify(books);

    return temp;
  }

  // 上傳VIP資訊
  uploadVipStatus() {
    const postUrl = new URL(this.userAPI);
    const params = new URLSearchParams();
    var tb = '';
    params.set('memno', this.us.user!.id);
    // console.log(this.cart.filter((item) => item.selected).length);
    const usedVipCoupon = this.cart.filter((item) => item.selected).length;

    // 判斷是否使用VIP優惠
    if (usedVipCoupon >= 1) {
      tb = usedVipCoupon ? '01' : '';
      params.set('tb', tb);

      // 使用過VIP優惠後更新狀態
      this.us.user!.usedVipCoupon = false;
    }

    // 整理參數成URL
    const vipUrl = `${postUrl}?${params.toString()}`;
    // console.log(vipUrl);

    // 回傳參數給API
    this.http.get(vipUrl).subscribe(
      (r: any) => {
        // 在這裡處理 API 返回的數據
      },
      (error: any) => {
        // 在這裡處理錯誤
        console.error('API 請求失敗:', error);
        // 可以執行錯誤處理的相關操作，例如顯示錯誤訊息給使用者或執行回退邏輯
      }
    );
  }

  //清除購物車
  clearCart() {
    this.cart = [];
    this.order = new Order();
    this.order.cart = this.cart;
    this.allNotUseCoupon = false;
    this.updateCart();
  }

  //寄成功電子郵件
  sendMail() {}
}
