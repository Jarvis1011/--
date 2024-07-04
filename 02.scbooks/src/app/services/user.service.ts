import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User, UserDataService } from './user-data.service';
import { StorageService } from './storage.service';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from './config.service';
import { UtilitiesService } from './utilities.service';
// import { DataService } from "./data.service";
import { environment } from 'src/environments/environment';
// import { VipService } from './vip.service';

import * as moment from 'moment';

export class UploadState {
  uploading: boolean = false;
  isUploaded: boolean = false;
  success: boolean = false;
  hasError: boolean = false;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  testUserID = '323141';
  testAccount = { account: 'frankwang', password: 'ch123456' };

  user!: User | undefined;

  newUser: User | undefined;

  private userAPI = environment.ApiUrl + 'api/MemberUser.aspx';
  private updateAPI = environment.ApiUrl + 'api/memberuser_ins.aspx';
  private vipAPI = environment.ApiUrl + 'api/vipcontrol.aspx?sn=1';

  //是否已驗證
  userValidated: boolean = false;
  //是否已從主機取得伺服器資料
  userReceived: boolean = false;

  //儲存未登入前的網址，登入後可直接前往
  redirectUrl: string = '';

  isLogin: boolean = false;
  isManager: boolean = false;
  isVip: boolean = false;
  usedVipCoupon: boolean = false;

  //通知資料
  loginAccount$!: Subject<any>;
  loginName$!: Subject<any>;
  isLogin$!: Subject<any>;
  loginError$!: Subject<any>;
  validated$!: Subject<any>;
  vipStatus$!: Subject<any>;
  isVip$!: Subject<any>;
  usedVipCoupon$!: Subject<any>;

  config!: any;

  // vip資訊
  vipControlData: any;

  //變更密碼旗標
  passwordChanged = false;

  //本地端登出旗標
  logoutAtStart: boolean = false;

  //登入後到首頁旗標
  loginToIndex: boolean = false;

  constructor(
    private http: HttpClient,
    private ud: UserDataService,
    private ss: StorageService,
    private cs: ConfigService,
    private ut: UtilitiesService // private vip: VipService // private ds: DataService,
  ) {
    //取得組態
    this.cs.config$.subscribe((r: any) => {
      this.config = r;
    });

    //登入登出通知
    this.loginAccount$ = new Subject();
    this.loginName$ = new Subject();
    this.isLogin$ = new Subject();
    this.loginError$ = new Subject();
    this.validated$ = new Subject();
    this.isVip$ = new Subject();
    this.usedVipCoupon$ = new Subject();

    //本地端登入，由 app.component 起動
  }

  //更新資料
  uploadUser(user: User | undefined, type: string) {
    var postUrl = new URL(this.updateAPI);
    var userObj = this.ud.transformDataToServer(user as User);

    //加入更新參數
    switch (type) {
      case 'update':
        userObj['ACT'] = 'UPD';
        break;
      case 'new':
        userObj['ACT'] = 'INS';
        break;
    }

    var postParams = new URLSearchParams(userObj);
    postUrl.search = postParams.toString();

    // console.log('上傳：', postUrl.href);

    return this.http
      .get(postUrl.href)
      .pipe

      //回傳結果：[{"DataCheck":"OK","DataDesc":"更新成功"}]
      // map( (r:any) => r[0].DataCheck),

      // debug
      // tap( r => console.log("上傳結果:", r) ),
      ();
  }

  // 本地端登入 ********** */
  startFromLocal() {
    //取得截止日期
    var expiredDateStr = this.ss.getItem(StorageService.EXPIRED_DATE);

    if (
      expiredDateStr &&
      moment(expiredDateStr).isAfter(moment().format(this.ud.dateFormat))
    ) {
      //本地端未過期，可登入

      // 取得本地端資料
      var memberStr: string = this.ss.getItem(StorageService.USER) as string;
      var obj = JSON.parse(memberStr);

      this.loginFromLocal(memberStr);
    } else {
      // console.log("已過期，登出！");
      this.logoutAtStart = true;
      this.logout();
      this.logoutAtStart = false;
    }
  }

  getUserByID(id: string) {
    var userUrl = new URL(this.userAPI);
    var searchParams = new URLSearchParams({
      memno: id,
    });
    userUrl.search = searchParams.toString();

    return this.http.get(userUrl.href).pipe(
      // debug
      // tap( r => console.log("from us id:", r) ),

      map((r: any) => r[0]),

      //轉成專案用的使用者格式
      map((r) => this.ud.transformData(r))
    );
  }

  getUserByMail(email: string) {
    var userUrl = new URL(this.userAPI);
    var searchParams = new URLSearchParams({
      mail: email,
    });
    userUrl.search = searchParams.toString();

    return this.http
      .get(userUrl.href)
      .pipe

      // debug
      // tap( r => console.log("from us mail:", r) ),

      // map( (r:any) => r[0]),
      ();
  }

  getUserByAccount(account: string, password: string) {
    var userUrl = new URL(this.userAPI);
    var searchParams = new URLSearchParams({
      ac: account,
      pa: password,
    });
    userUrl.search = searchParams.toString();

    return this.http.get(userUrl.href).pipe(
      // debug
      // tap( r => console.log("from us account:", r) ),

      map((r: any) => r[0]),

      //轉成專案用的使用者格式
      map((r) => this.ud.transformData(r))
    );
  }

  getUserByEmail(email: string) {
    var userUrl = new URL(this.userAPI);
    var searchParams = new URLSearchParams({
      mail: email,
    });
    userUrl.search = searchParams.toString();

    // console.log(userUrl.href);

    return this.http
      .get(userUrl.href)
      .pipe

      // debug
      // tap( r => console.log("from us email:", r) ),

      // map( (r:any) => r[0]),

      //轉成專案用的使用者格式
      // map( r => this.ud.transformData(r)),
      ();
  }

  // 獲取vip功能資訊
  getVipControlData() {
    var vipUrl = new URL(this.vipAPI);
    return this.http.get(vipUrl.href).pipe(
      tap((r: any) => {
        if (this.isVip$) {
          this.vipControlData = r;
        }
      })
    );
  }

  //檢查帳戶是否驗證
  checkAccountValidated(
    account: string | undefined,
    password: string | undefined
  ): Observable<any> {
    return this.getUserByAccount(account as string, password as string).pipe(
      map((r: any) => {
        if (r.ckeckState == '未認證') {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  //從本地端登入
  loginFromLocal(memberStr: string) {
    //存入使用者
    this.user = this.ud.transformJSONtoUser(memberStr);

    // console.log(this.user);
    //狀態
    this.isLogin = true;
    if (this.user?.isVip) {
      this.isVip = true;
    }
    if (this.user?.usedVipCoupon) {
      this.usedVipCoupon = true;
    }

    //檢查是否為管理員
    this.checkManager();

    //通知
    this.notify(
      this.user?.account,
      this.user?.realname,
      true,
      false,
      true,
      true,
      true
    );

    // console.log("從本地端登入：", this.user);
  }

  //檢查是否為管理員
  checkManager() {
    this.cs.config$.subscribe((r) => {
      if (
        (this.cs.config.webManagers as Array<any>).indexOf(
          this.user?.account
        ) >= 0
      ) {
        this.isManager = true;
      }
    });
  }

  login(account: string, password: string): Observable<any> {
    return this.getUserByAccount(account, password).pipe(
      tap((r) => {
        if (r) {
          // console.log("login 驗證狀態:", r.ckeckState);

          //已收到資料
          this.userReceived = true;

          // this.vip;

          if (r.ckeckState == '未認證' && this.config.onlyValidated) {
            //未驗證，不給登入
            this.userValidated = false;
            //通知
            this.notify(
              undefined,
              undefined,
              false,
              false,
              false,
              false,
              false
            );
          } else {
            //已驗證，登入
            this.userValidated = true;
            //存入使用者
            this.user = r;
            // console.log(this.user);

            //狀態
            this.isLogin = true;
            this.isVip = this.user.isVip;
            this.usedVipCoupon = this.user.usedVipCoupon;

            //檢查是否為管理員
            this.checkManager();

            //儲存本地端
            this.saveLocalData();

            //通知
            this.notify(
              this.user?.account,
              this.user?.realname,
              true,
              false,
              true,
              true,
              true
            );
          }
        } else {
          console.log('找不到使用者');

          //通知
          this.notify('', '', false, true, undefined, false, false);
        }
      })
    );
  }

  //更新表單上傳成功後，將表單資料傳入，並更新 user
  updateLocalUser(formValue: any) {
    this.user = formValue;
    this.saveLocalData();
    //通知
    this.notify(
      this.user?.account,
      this.user?.realname,
      true,
      false,
      true,
      true,
      true
    );
  }

  saveLocalData() {
    this.ss.setItem(StorageService.USER, JSON.stringify(this.user));
    this.ss.setItem(
      StorageService.EXPIRED_DATE,
      moment()
        .add(this.config.localExpiredDays, 'days')
        .format(this.ud.dateFormat)
    );
  }
  clearLocalData() {
    this.ss.removeItem(StorageService.USER);
    this.ss.removeItem(StorageService.EXPIRED_DATE);
  }

  logout() {
    this.user = undefined;
    this.isLogin = false;
    this.isManager = false;
    this.isVip = false;
    this.usedVipCoupon = false;

    //通知
    this.notify('', '', false, false, undefined, false, false);

    //清除本地端
    this.clearLocalData();

    //重新導航
    if (!this.logoutAtStart) {
      this.ut.navigate('/login');
    }
  }

  //發出通知
  notify(
    account: string | undefined,
    realname: string | undefined,
    isLogin: boolean,
    loginError: boolean,
    validated: boolean | undefined,
    isVip: boolean,
    usedVipCoupon: boolean
  ) {
    this.loginAccount$.next(account);
    this.loginName$.next(realname);
    this.isLogin$.next(isLogin);
    this.loginError$.next(loginError);
    this.validated$.next(validated);
    this.isVip$.next(isVip);
    this.usedVipCoupon$.next(usedVipCoupon);
  }
}
