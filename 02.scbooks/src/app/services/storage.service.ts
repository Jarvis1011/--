import { Injectable } from '@angular/core';
// import { UtilitiesService } from "../services/utilities.service";
import { AlgorithmService } from "./algorithm.service";


@Injectable({
	providedIn: 'root'
})
export class StorageService {

	static USER = "user";
	static EXPIRED_DATE = "local_expired_date"

	static CART = "cart";
	static CART_EXPIRED_DATE = "local_cart_expired_date"

	app_ID = "scbooks2022_";

	constructor(
		// private us: UtilitiesService,
		private as: AlgorithmService,
	) { }

	setItem(key:string, data:string):void{
		// localStorage.setItem(key, this.as.encrypt(data));
		localStorage.setItem(this.app_ID + key, data);
	}
  
	getItem(key:string){
		// return this.as.decrypt(localStorage.getItem(key));
		return localStorage.getItem(this.app_ID + key);
	}
  
	removeItem(key:string):void{
		localStorage.removeItem(this.app_ID + key);
	}
  
	clear():void{
		localStorage.clear();
	}
}
