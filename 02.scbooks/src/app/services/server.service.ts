import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

/********
 * 
 * 模擬伺服器使用
 * 
**********/
export class ServerService {

	url = "assets/json/_test_ckcsongs_id.json";

	//測試用資料流
	all$ = this.http.get(this.url).pipe(
		shareReplay(1),
	);
	
	ckcsongs$ = this.http.get(this.url).pipe(
		shareReplay(1),
		switchMap((r:any)=> from(r.data)),
		// tap(r=>console.log(r)),
	);

	group_names$ = this.http.get(this.url).pipe(
		shareReplay(1),
		switchMap((r:any)=>{
			var a = (r.types as Array<string>).concat(r.categories);
			return from(a);
		}),
	);


	constructor(
		private http: HttpClient,
	) { 
	}


}
