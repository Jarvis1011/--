import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from "../services/user.service";

@Injectable({
	providedIn: 'root'
})
export class MemberGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

	isLogin: boolean = false;


	constructor(
		private router: Router,
		private us: UserService,
	) {


	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
	{

		// console.log("--> canActivate:", this.isLogin);
		
		//正式
		if (this.us.isLogin) {
			return true;
		} else {
			// 導回首頁或登入頁
			this.router.navigate(['/login']);

			return false;
		}
	}



	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
	{
		return this.canActivate(childRoute, state);
	}



	canDeactivate(
		component: unknown,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
	{
		return true;
	}



	canLoad(
		route: Route,
		segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
	{
		return true;
	}
}
