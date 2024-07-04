/*
參考：https://ddtwork.blogspot.com/2020/07/angular-http-cross-origin-resource.html

*/

/*
另法：
修改瀏覽器參數：https://blog.gtwang.org/web-development/chrome-configuration-for-access-control-allow-origin/
*/

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

	constructor() { }


	intercept(req: HttpRequest<any>, next: HttpHandler) {
		req = req.clone({
			setHeaders: { /*有關CORS的參數就可以改在這裡了*/
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS, PATCH',
				'Access-Control-Max-Age': '86400'
			}
		});
		return next.handle(req);

	}
}
