import { Injectable } from '@angular/core';
import { DataService} from "./data.service";

import { debounceTime, filter, map, shareReplay, switchMap, toArray, distinctUntilChanged, tap } from 'rxjs/operators';
import { from, fromEvent, Observable } from 'rxjs';

//** 模擬伺服器使用 **/
import { ServerService } from "./server.service";



@Injectable({
	providedIn: 'root'
})
export class SearchService {

	//測試用資料流
	ckcsongs$ = this.server.ckcsongs$
		.pipe(
			map((r:any) => r.title),
		);

	//類別
	groups$ = this.server.ckcsongs$.pipe(
		switchMap((r: any)=>{
			var a = (r.types as Array<string>).concat(r.categories);
			return from(a);
		}),
	);


	constructor(
		private ds: DataService,
		private server: ServerService,
	) { }

	// 自動完成 *******
	//取得 keyword 的資料流
	getKeyUpStream(inputEle: any, dataStream: Observable<any>){

		return fromEvent(inputEle, "input").pipe(
			// 取得鍵入資料
			map((r:any) => r.target.value),

			// 避免一有新事件就查詢
    		debounceTime(500),

			// 避免重複的查詢
    		distinctUntilChanged(),

			// 避免內容太少查出不精準的結果，並排除空字串查詢
    		filter(keyword => keyword.length >= 1),

			//從資料來源取得建議字陣列
			switchMap(keyword => this.getSuggestion(dataStream, keyword)),
		);
	}

	//取得建議字陣列
	getSuggestion(dataStream: Observable<any>, keyword: string){
		//大小寫皆可
		return dataStream.pipe(
			filter((r: string) => r.toLowerCase().indexOf(keyword.toLowerCase()) >= 0),
			toArray()
		);
	}

	//自動完成 end **********
}
