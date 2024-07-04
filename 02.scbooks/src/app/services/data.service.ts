import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

//** 模擬伺服器使用 **/
// import { ServerService } from "./server.service";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  bookListAPI = environment.ApiUrl + 'api/BookDetail_List.aspx';

  //test 使用，透過 proxy.conf.json 解決跨網域讀取問題
  // bookListAPI = "/api/BookDetail_List.aspx";
  vipConfig: any;

  //首頁資料
  getPageIindex$ = this.http
    .get('assets/json/page_index.json')
    .pipe(shareReplay(1));

  // config: any;

  /* all$ = this.server.all$;
	ckcsongs$ = this.server.ckcsongs$;
	group_names$ = this.server.group_names$; */

  //解決取資料 CORS 問題（政府開放平台資料）
  //https://ithelp.ithome.com.tw/articles/10208777
  /* govHttpOptions = {
		headers: new HttpHeaders({
			'Access-Control-Allow-Origin': 'https://quality.data.gov.tw/',
			'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
			'Access-Control-Max-Age': '86400'
		})
	}; */

  constructor(
    private http: HttpClient // private cs: ConfigService,
  ) {}

  getBookData(bookID: string) {
    var bookUrl = environment.ApiUrl + 'api/bookDetail.aspx?BookID=';

    return this.getText(bookUrl + bookID).pipe(
      shareReplay(1),

      //移除 tab 確保 json 能解析
      map((r) => r.replace(/\t/g, ' ')),

      //將字串中的"\"改為"/""（不可以右邊是 " 雙引號，以免動到 html ）
      //某些書名中有「\」
      map((r) => r.replace(/\\(?!\")/g, '／')),

      // debug 用
      // tap( r => console.log("from ds:", r)),

      map((r) => JSON.parse(r)),
      map((r) => r[0])
    );
  }

  searchSerieBooks(
    id: string,
    pageIndex: number,
    recordsPerPage: number,
    sort: string | undefined = undefined
  ) {
    /* var paraObj:any = {
			pageIndex: pageIndex.toString(),
			recordsPerPage: recordsPerPage.toString(),
			Series: id
		}; */

    var paraObj: any = {
      pageIndex: pageIndex.toString(),
      recordsPerPage: recordsPerPage.toString(),
      type: id,
    };

    //搜尋依價格排序
    if (sort == 'price') {
      paraObj.sort = 1;
    }
    if (sort == 'price2') {
      paraObj.sort = 2;
    }
    //搜尋異動日期排列
    if (sort == 'update') {
      paraObj.sort = 3;
    }

    var searchUrl = new URL(this.bookListAPI);
    var searchParams = new URLSearchParams(paraObj);
    searchUrl.search = searchParams.toString();

    // console.log(searchUrl.href);

    return this.getText(searchUrl.href).pipe(
      shareReplay(1),

      map((r) => JSON.parse(r))
    );
  }

  searchByKeyword(
    keyword: string,
    pageIndex: number,
    recordsPerPage: number,
    onlySC: boolean
  ) {
    var paraObj: any = {
      pageIndex: pageIndex.toString(),
      recordsPerPage: recordsPerPage.toString(),
      AUTHOR: keyword,
      BKNAME: keyword,
      BookID: keyword,
    };
    //只查商鼎
    if (onlySC) {
      paraObj.type = 'sc';
    }

    var searchUrl = new URL(this.bookListAPI);
    var searchParams = new URLSearchParams(paraObj);
    searchUrl.search = searchParams.toString();

    // console.log("searching!!!", searchUrl.href);

    return this.getText(searchUrl.href).pipe(
      shareReplay(1),

      //移除 tab 確保 json 能解析
      map((r) => r.replace(/\t/g, ' ')),

      //將字串中的"\"改為"/""（不可以右邊是 " 雙引號，以免動到 html ）
      //某些書名中有「\」
      map((r) => r.replace(/\\(?!\")/g, '／')),

      //debug
      // tap( r => console.log("from ds search keyword:", r)),

      map((r) => JSON.parse(r))
    );
  }

  //取政府開放平台資料
  /* getGov(url:string){
		return this.http.get(url, this.govHttpOptions);
	} */

  get(url: string) {
    return this.http.get(url);
  }

  //舊版
  getText(url: string) {
    return this.http.get(url, { responseType: 'text' });
  }

  //新版解決 CORS

  /* getText(url: string) {
		return this.http.get(url, {
			responseType: 'text',

			headers: new HttpHeaders({
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS, PATCH",
				"Access-Control-Max-Age": "86400",
				// "Access-Control-Allow-Headers": "Content-Type",
				// "Content-Type": "application/json"
			})
		});
	} */
}
