import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from './services/menu.service';

import { ConfigService } from './services/config.service';
import { UserService } from './services/user.service';
// import { User } from "./services/user-data.service";
import { CartItem, CartService } from './services/cart.service';

import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './services/data.service';
import { UtilitiesService } from './services/utilities.service';
// modal彈跳視窗
// import { ModalComponent } from './lazyPages/modal-module/modal.component';
// import { SearchService } from "./services/search.service";
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('search') searchInput!: ElementRef;
  @ViewChild('search_sm') searchInput_sm!: ElementRef;

  config: any = {};

  menu: Array<any> = [];
  menuTitle = '';

  //導覽列判斷是否啟用中
  urlStr: string = '';

  //footer內容
  footer_page_html: string = '';

  // modal內容
  index_modal: string = '';

  //登入的帳號
  loginAccount = '';
  loginName = '';

  //輸入框事件流
  /* keyUp$!: Observable<any>;
	keyUp_sm$!: Observable<any>; */

  searchStr: string = '';

  // vip優惠狀態訊息
  vipStatusTips = '';

  // user!: User | undefined;

  //購物車總數
  cartTotal: number = 0;

  bodyText = 'This text can be updated in modal 1';

  constructor(
    private ds: DataService,
    private ut: UtilitiesService,

    private ms: MenuService,
    private router: Router,
    private route: ActivatedRoute,

    private cs: ConfigService,
    public us: UserService,
    private ct: CartService // private ss: SearchService,
  ) {
    //取得網站目錄
    ms.getMenu$.subscribe((r: any) => {
      this.menu = ms.menu;
      this.menuTitle = r.menuTitle;
    });

    //取得組態
    cs.config$.subscribe((r: any) => {
      this.config = r;

      this.initCart();
    });
  }

  ngOnInit() {
    //訂閱帳號（可任選一個顯示在功能表上）
    this.us.loginAccount$.subscribe((r) => (this.loginAccount = r));
    this.us.loginName$.subscribe((r) => (this.loginName = r));

    //由本地端登入
    this.us.startFromLocal();

    // vip優惠訊息
    this.us.getVipControlData().subscribe((r) => {
      this.vipStatusTips = r[0].vipStatusTips;
    });

    //取得頁尾
    this.ds.getText('assets/html/footer.html').subscribe(
      (r: any) => {
        this.footer_page_html = r;
      },
      (err: Error) => {
        console.log('無法載入頁尾');
      }
    );

    //取得路徑
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        this.urlStr = res.url;
      }
    });
  }

  initCart() {
    //本地端購物車資料
    this.ct.startFromLocal();

    //訂閱購物車數量
    this.ct.countTotal$.subscribe((r) => (this.cartTotal = r));
  }

  ngAfterViewInit() {
    //處理自動完成
    // this.autoComplete();
  }
  //自動完成*****
  /* autoComplete(){
		//取得 keyword 的資料流
		this.keyUp$ = this.ss.getKeyUpStream(this.searchInput.nativeElement, this.ss.ckcsongs$);
		this.keyUp$.subscribe(r => this.suggestions = r);

		this.keyUp_sm$ = this.ss.getKeyUpStream(this.searchInput_sm.nativeElement, this.ss.ckcsongs$);
		this.keyUp_sm$.subscribe(r => this.suggestions = r);


	} */

  // end ******** */

  //搜尋
  onSearch(event: Event) {
    // console.log("**search event**!!!");

    // this.suggestions = [];

    //記錄搜尋字
    this.ut.searchKeyword = this.searchStr;

    if (this.searchStr == '') {
      return;
    } else {
      this.ut.navigate('/search/keyword/' + this.searchStr + '/1');
    }
  }

  //依分類搜尋
  /* searchSeries(id:string){
		console.log(id);

	} */

  //****** */
  //命令啟用外觀
  activeMenu(url: string, active: Array<string>) {
    var result = '';

    var n = active.length;
    for (var i = 0; i < n; i++) {
      var value = active[i];
      if (url.indexOf(value) >= 0) {
        result = 'active';
        break;
      }
    }

    return result;
  }

  //如果導覽列項目含有子功能表，則點擊不前往頁面
  goto(link: string, dropDownID: string) {
    if (!dropDownID) {
      if (link.indexOf('http') >= 0) {
        //外部連結
        window.open(link, 'blank');
        // location.assign(link);
      } else {
        //內部連結
        this.router.navigate([link]);
      }
    }
  }

  //有無子功能表
  hasDropDown(menuItem: any): boolean {
    return menuItem.dropDownID ? true : false;
  }

  //導覽列功能表的自動關閉
  //手機版子功能表使用手風琴，點擊過程需保持開啟
  autoClose() {
    return window.screen.width >= 992 ? true : 'outside';
  }

  /* 處理外部載入的超連結 routerLink */
  onDataClick(event: any) {
    this.ut.goto(event);
  }

  logout() {
    this.us.logout();
  }

  // 首頁彈跳視窗
  myModal_JumpOut() {}

  /* getAccount(user: User | undefined){
		return this.user?.account;
	} */
}
