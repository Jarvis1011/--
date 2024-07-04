import { Component, OnInit } from '@angular/core';
// import { HttpClient } from "@angular/common/http";

import { ConfigService } from "../../services/config.service";
// import { UserService } from "../../services/user.service";
// import { CartService } from "../../services/cart.service";

import { DataService } from "../../services/data.service";
import { UtilitiesService } from "../../services/utilities.service";


@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

	config: any;

	//頁面資料
	pageData: any = {};		

	//主要輪播資料
	mainCarousel: Array<any> = [];

	//分區資料
	s2_bgColor: string = "";
	s2p1: any = {};
	s2p2: any = {};
	s2p3: any = {};
	s_column: any = {};
	s_newBook: any = {};
	s_book_ser1: any = {};
	s_book_ser2: any = {};
	s_video: any = {};
	s_ad: any = {};
	s_ad_json: Array<any> = [];

	newBook_group_4: Array<any> = [];
	newBook_group_3: Array<any> = [];
	newBook_group_2: Array<any> = [];

	ser1_group_4: Array<any> = [];
	ser1_group_3: Array<any> = [];
	ser1_group_2: Array<any> = [];

	ser2_group_4: Array<any> = [];
	ser2_group_3: Array<any> = [];
	ser2_group_2: Array<any> = [];



	s2p2_html: string = "";
	s2p3_html: string = "";

	ad_html: string = "";


	//第二區輪播資料
	s2_carousel: Array<any> = [];


	/*  
	******************
	測試用
	******************
	*/
	
	s_ad_test: any = {};
	ad_test_html: string = "";


	constructor(
		private cs: ConfigService,
		// private us: UserService,
		// private cts: CartService,

		private ds: DataService,
		private ut: UtilitiesService,
	) {

		//載入頁面資料
		ds.getPageIindex$.subscribe((r:any) => {
			this.mainCarousel = r.mainCarousel;
			
			this.s2_bgColor = r.section2.bg_color;

			this.s2p1 = r.section2.part1;
			this.s2p2 = r.section2.part2;
			this.s2p3 = r.section2.part3;

			this.s2_carousel = r.section2.part1.s2_carousel;

			this.s_column = r.section_column;
			
			this.s_newBook = r.section_newBook;
			this.s_book_ser1 = r.section_ser_1;
			this.s_book_ser2 = r.section_ser_2;

			this.s_video = r.section_video;

			this.s_ad = r.section_ad;
			this.s_ad_json = r.section_ad_json;


			/*  
			******************
			測試用
			******************
			*/
			// this.s_ad_test = r.section_ad_test;


			//分組陣列（要先複製陣列，不然會破壞原始資料）
			this.newBook_group_4 = this.separateArray(this.s_newBook.items.concat(), 4);
			this.newBook_group_3 = this.separateArray(this.s_newBook.items.concat(), 3);
			this.newBook_group_2 = this.separateArray(this.s_newBook.items.concat(), 2);


			this.ser1_group_4 = this.separateArray(this.s_book_ser1.items.concat(), 4);
			this.ser1_group_3 = this.separateArray(this.s_book_ser1.items.concat(), 3);
			this.ser1_group_2 = this.separateArray(this.s_book_ser1.items.concat(), 2);


			this.ser2_group_4 = this.separateArray(this.s_book_ser2.items.concat(), 4);
			this.ser2_group_3 = this.separateArray(this.s_book_ser2.items.concat(), 3);
			this.ser2_group_2 = this.separateArray(this.s_book_ser2.items.concat(), 2);


			//載入外部網頁
			this.loadHtml();
		

			
		});

		//取得組態
		cs.config$.subscribe((r:any) => {
			this.config = r;			
		});

	 }

	ngOnInit(): void {
		
	}

	loadHtml(){
		
		this.ds.getText(this.s2p2.html).subscribe((r:any)=>{
			this.s2p2_html = r;
		});
		this.ds.getText(this.s2p3.html).subscribe((r:any)=>{
			this.s2p3_html = r;
		});

		this.ds.getText(this.s_ad.html).subscribe((r:any)=>{
			this.ad_html = r;
		});


		/*  
		******************
		測試用
		******************
		*/
		/* this.ds.getText(this.s_ad_test.html).subscribe((r:any)=>{
			this.ad_test_html = r;
		}); */


		
	}


	clickLink(url:string){		
		this.ut.navigate(url);
	}

	/* 處理外部載入的超連結 routerLink */
	onDataClick(event:any){
		this.ut.goto(event);
	}

	//將陣列依指定數量分組
	separateArray(arr:Array<any>, num: number){
		return this.ut.separateArray(arr, num);
	}

	//判斷是否反白字類別
	isTextLight(value:boolean){
		return value ? "text-light" : "";
	}

	//取得 youtube 影片內嵌網址
	getVideoID(url:string){
		return this.ut.getVideoID(url);
	}


}
