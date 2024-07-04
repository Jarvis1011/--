import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menu: any;

  getMenu$ = this.http.get('assets/json/menu.json').pipe(
    shareReplay(1),
    tap((r: any) => {
      if (!this.menu) {
        this.menu = r.menu;
      }
    })
  );

  //從 menu 中取得產品類別******
  //所有產品類別
  groups: Array<any> = [];

  getProductGroup$ = this.getMenu$.pipe(tap((r) => this.getGroups(r)));

  productMenu$ = this.getMenu$.pipe(map((r) => r.menu[0].subMenu));

  // 只有vip顯示

  constructor(private http: HttpClient) {}

  private getGroups(r: any) {
    if (this.groups.length == 0) {
      //沒有資料才處理，已有時不處理
      var m: Array<any> = r.menu[0].subMenu;
      m.forEach((v, i) => {
        var items: Array<any> = v.items;
        items.forEach((item) => {
          this.groups.push({
            name: item.title,
            header: v.header,
            id: item.id,
          });
        });
      });
    }
  }
}
