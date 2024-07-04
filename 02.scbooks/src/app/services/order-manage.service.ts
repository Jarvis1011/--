import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import { Order } from "./cart.service";
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

//查詢參數
export class OrderParams {
  recordsPerPage: number = 1;
  pageIndex: number = 1;
  orderdate: string = '2022-05-30';
  orderdate2: string = '';
  userid: string = '';
  orderid: string = '';
  name: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class OrderManageService {
  private orderListAPI = environment.ApiUrl + 'api/orderlist.aspx';
  private updateOrderAPI = environment.ApiUrl + 'api/orderset.aspx';

  orderList$: Subject<any>;

  searchParams: OrderParams;

  //訂單的編輯狀態
  private _isEditing: boolean = false;
  editingOrderId: string = '';
  isEditing$: Subject<boolean>;

  constructor(private ds: DataService) {
    this.searchParams = new OrderParams();
    this.orderList$ = new Subject();
    this.isEditing$ = new Subject();

    this.setEditing(false);
  }

  getOrderListByID$(
    userid: string,
    pageIndex: number,
    recordsPerPage: number
  ): Observable<Object> {
    var params = new OrderParams();
    params.userid = userid;
    params.pageIndex = pageIndex + 1;
    params.recordsPerPage = recordsPerPage;
    // params.orderdate = params.orderdate.replace(/\-/g, "");
    params.orderdate = '20220530';
    params.orderdate2 = params.orderdate2.replace(/\-/g, '');

    var postUrl = new URL(this.orderListAPI);
    var postParams = new URLSearchParams(params as any);
    postUrl.search = postParams.toString();

    // console.log("url:", postUrl.href);

    return this.ds.getText(postUrl.href);
  }

  searchOrders$(params: any): Observable<Object> {
    var postUrl = new URL(this.orderListAPI);
    var postParams = new URLSearchParams(params as any);
    postUrl.search = postParams.toString();

    return this.ds.getText(postUrl.href);
  }

  //轉換訂單名細的json
  convertJSON(list: Array<any>) {
    //轉換 JSON

    list.forEach((value, index) => {
      var temp: string = value.content;

      //修改千華系統自己加換行的bug
      temp = temp.replace(/<br \/>/g, ',');

      // console.log("convert:", index, temp);

      try {
        value.content = JSON.parse(temp);
      } catch (error) {
        // console.log("convert JSON error!", error);
      }
    });
  }

  //設定編輯狀態
  setEditing(editing: boolean, orderid: string = '') {
    this._isEditing = editing;
    this.editingOrderId = orderid;

    this.isEditing$.next(this._isEditing);
  }

  //更新訂單
  updateOrder$(
    orderid: string,
    bookbinding: string,
    orderok: boolean
  ): Observable<Object> {
    var params = {
      orderno: orderid,
      orderlevel: bookbinding,
      mok: orderok ? 1 : 0,
    };

    var postUrl = new URL(this.updateOrderAPI);
    var postParams = new URLSearchParams(params as any);
    postUrl.search = postParams.toString();

    // console.log("url:", postUrl.href);

    return this.ds.get(postUrl.href);
  }
}
