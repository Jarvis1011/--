import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

declare let bootstrap:any;

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {

	searchKeyword: string = "";

	constructor(
		private router: Router,
	) { }

	navigate(url:string){
		this.router.navigate([url]);
	}


	goto(event:any){
		
		var link: string = event.target.getAttribute("routerLink");

		// console.log(event.target, link);

		if (link) {
			if (link.indexOf("http://") >= 0 || link.indexOf("https://") >= 0) {
				//外部網站		
				window.location.assign(link);

			}else if(link.indexOf("#") >= 0){
				//捲動到本頁其他位置
				var t:any = document.getElementById(link.replace("#", ""));

				// t.scrollIntoView({block: "center"});

				// 捲動位置：頂部，但要扣掉上方導覽列的寬度
				var topOfElement = t.offsetTop - 90;
				window.scroll({ top: topOfElement, behavior: "smooth" });
				
			} else {
				//網站內部其他頁面
				this.navigate(link);
			}
		}

		
	}

	//捲動到指定元素
	scrollToElement(eleID:string){
		var t: any = document.getElementById(eleID);

		// 捲動位置：頂部，但要扣掉上方導覽列的寬度
		var topOfElement = t.offsetTop - 90;
		window.scroll({ top: topOfElement, behavior: "smooth" });
	}

	// 捲動到頂部
	scrollToTop(){
		window.scroll({ top: 0, behavior: "smooth" });
	}

	//前往頁籤
	gotoTab(tabname:string){

		var tabTrigger = document.querySelector('#' + tabname + "-tab");

		var tab = new bootstrap.Tab(tabTrigger);
		tab.show();

		//捲動到頂端
		setTimeout(() => {
			this.scrollToTop();
		}, 500);
	}

	//前往頁籤的指定區塊
	gotoTabAndScroll(tabname:string, id: string){

		var tabTrigger = document.querySelector('#' + tabname + "-tab");

		var tab = new bootstrap.Tab(tabTrigger);
		tab.show();

		//捲動到區塊
		setTimeout(() => {
			this.scrollToElement(id);
		}, 500);
	}


	//將陣列依指定數量分組
	separateArray(arr:Array<any>, num: number){

		var result: Array<any> = [];

		var n = arr.length;
		var k = Math.ceil(n / num ) - 1;

		for(var i=0; i<=k; i++){
			var group: Array<any> = [];

			for(var j=1; j<=num; j++){
				if(arr.length > 0){
					group.push(arr.shift());
				}
			}

			result.push(group);
		}		

		// console.log(result);
		

		return result;

	}

	//將 youtute 分享連結換成嵌入專用
	getVideoID(url:string){
		var result:string = "";
		var temp_arr: Array<any> = [];

		if (url.indexOf("watch?")>=0) {
			temp_arr = url.split("=");
			result = temp_arr[temp_arr.length - 1];

		} else if(url.indexOf("/")>=0){
			temp_arr = url.split("/");
			result = temp_arr[temp_arr.length - 1];
		}else{
			result = url;
		}

		// console.log(result);
		return result;
	}


}
