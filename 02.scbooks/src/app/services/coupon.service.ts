//麥斯所建API
//1. 查詢的介紹
//http://www.scbooks.com.tw/api/discount.aspx?id=38870

//2. 新增
//http://www.scbooks.com.tw/api/discount_ins.aspx?ACT=ins&a=99999&b=N&c=chienhua&d=&e=20220622&f=&g=20990902

//3. 更新
//http://www.scbooks.com.tw/api/discount_ins.aspx?ACT=upd&id=38871&a=888888&b=N&c=chienhua&d=aaaa&e=20220623&f=20220624&g=20990903

//折扣項目
/* export enum DiscountType {
	SIMPLE = "單本折扣",
	TICKET = "折價券",
	COMBO = "組合優惠",
	ABOVE_FLOOR_GIFT = "滿額贈",
	ABOVE_FLOOR_DISCOUNT = "滿額折扣",
	BUY_A_PLUS_B = "加價購"
} */

/* 測試用折價券
		測試主機	正式主機
975517  已用 		已用
975518	已用 		已用
975519	已用
975520	已用
975521	已用
975522	已用
975523	已用
975524	已用
975525
975526
975527
975528
975529
975530
975531
975532
975533
975534
975535
975536
*/

import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';

// 舊折價券json參數 20230626註解
// export class CouponData {
//   id: string = '';
//   couponSN: string = '';
//   canBeUsed: boolean = false;
//   user: string = '';
//   usedUser: string = '';
//   date1: string = '';
//   usedDate: string = '';
//   date2: string = '';
// }

// 新折價券json參數 20230626建立
export class CouponData {
  cNumber: string = '';
  couponSN: string = '';
  cDiscountPrice: number = 0;
  cDiscount: number = 0;
  canBeUsed: boolean = false;
  user: string = '';
  usedUser: string = '';
  date1: string = '';
  usedDate: string = '';
  date2: string = '';
  cBookNum: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  checkAPI = environment.ApiUrl + 'api/discount.aspx';
  updateAPI = environment.ApiUrl + 'api/discount_ins.aspx';
  couponAPI = environment.ApiUrl + 'api/coupon.aspx';

  //旗標
  couponCanBeUsed = false;
  couponOverdue = false;
  noCoupon = false;
  isUsed = false;
  isCouponBook = false;
  noCouponBook = false;

  //折價券序號
  couponID = '';

  //使用過的折價券（上傳用）
  usedCoupon: CouponData = new CouponData();

  // 欄位對照物件
  fields = [
    {
      title: '流水序號',
      from: 'cNumber',
      to: 'cNumber',
      type: 'string',
    },
    {
      title: '折價金額',
      from: 'cDiscountPrice',
      to: 'cDiscountPrice',
      type: 'number',
    },
    {
      title: '折價%',
      from: 'cDiscount',
      to: 'cDiscount',
      type: 'number',
    },
    {
      title: '流水序號',
      from: 'cNumber',
      to: 'couponSN',
      type: 'string',
    },
    {
      title: '是否可以使用 Y/N',
      from: 'cIsUsed',
      to: 'canBeUsed',
      type: 'boolean',
    },
    {
      title: '使用者 目前寫chienhua 意思沒有限定使用會員',
      from: 'cUser',
      to: 'user',
      type: 'string',
    },
    {
      title: '已使用的會員',
      from: 'cUser',
      to: 'usedUser',
      type: 'string',
    },
    {
      title: '期間 起日',
      from: 'cStart',
      to: 'date1',
      type: 'string',
    },
    {
      title: '已使用日期',
      from: 'cDateUsed',
      to: 'usedDate',
      type: 'string',
    },
    {
      title: '期間 迄日',
      from: 'cDeadline',
      to: 'date2',
      type: 'string',
    },
    {
      title: '書號',
      from: 'cBookNum',
      to: 'cBookNum',
      type: 'string',
    },
  ];

  constructor(private ds: DataService) {}

  resetCouponState() {
    this.couponCanBeUsed = false;
    this.couponOverdue = false;
    this.noCoupon = false;
    this.isUsed = false;
    this.isCouponBook = false;
    this.noCouponBook = false;
    this.usedCoupon = new CouponData();
  }

  //更新折價券
  updateCoupon$(): Observable<any> {
    var couponUrl = new URL(this.updateAPI);

    var temp = this.transformDataToServer(this.usedCoupon);
    temp.ACT = 'upd';

    var searchParams = new URLSearchParams(temp);

    couponUrl.search = searchParams.toString();

    return this.ds.get(couponUrl.href);
  }

  //檢查折價券
  // 舊的API
  // checkCoupon$(couponID: string): Observable<any> {
  //   var couponUrl = new URL(this.checkAPI);
  //   var searchParams = new URLSearchParams({
  //     //這個欄位應該是 a，但寫 API 的麥斯沒有改，故沿用下來
  //     id: couponID,
  //   });
  //   couponUrl.search = searchParams.toString();

  //   console.log('check coupon:', couponUrl.href);

  //   return this.ds.get(couponUrl.href);
  // }

  // 新的API
  checkCoupon$(couponID: string): Observable<any> {
    const couponUrl = new URL(this.couponAPI);
    var searchParams = new URLSearchParams({
      cNumber: couponID,
    });
    couponUrl.search = searchParams.toString();

    // console.log(this.ds.get(couponUrl.href));

    return this.ds.get(couponUrl.href);
  }

  //把來自主機的資料形式轉成專案使用的格式
  transformData(oridata: any): CouponData {
    if (oridata) {
      var coupon: any = {};

      this.fields.forEach((field, index) => {
        switch (field.type) {
          case 'number':
            coupon[field.to] = Number(oridata[field.from]);
            break;

          case 'boolean':
            coupon[field.to] = oridata[field.from] == 'Y';
            break;

          default:
            coupon[field.to] = oridata[field.from];
            break;
        }
      });

      return coupon as CouponData;
    } else {
      return new CouponData();
    }
  }

  // 把專案的折價券資料轉成主機所需格式
  transformDataToServer(coupon: CouponData): any {
    var temp: CouponData = coupon;
    var result: any = {};

    this.fields.forEach((field, index) => {
      switch (field.type) {
        case 'boolean':
          result[field.from] = (temp as any)[field.to] ? 'Y' : 'N';
          break;

        default:
          result[field.from] = (temp as any)[field.to];
          break;
      }
    });

    // console.log("轉換折價券", result);

    return result;
  }

  //今天是不是在兩個指定日期區間內
  isBetween(date1: string, date2: string): boolean {
    var d1 = date1.replace(/\//g, '-');
    var d2 = date2.replace(/\//g, '-');
    // var d1 = "2022-06-20";
    // var d2 = "2022-06-23";
    var today = moment().valueOf();

    var result = moment(today).isBetween(d1, d2, 'day', '[]');

    // console.log("between:", moment(today).format("YYYY-MM-DD"), result);

    return result;
  }
}
