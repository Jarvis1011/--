import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from "../../services/utilities.service";
import { DataService } from "../../services/data.service";
import { MenuService } from "../../services/menu.service";
import { ConfigService } from "../../services/config.service";
import { DiscountService } from "../../services/discount.service";

import { map } from "rxjs/operators";

enum searchTypes {
	series = 'series',
	keyword = 'keyword',
}

export interface IParameter {
    type: string;
    id: string;
    pageIndex: number;
	sort: string | undefined;
}


@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {

	config: any;

	type: string = searchTypes.series;

	params!: IParameter;

	books$: any;

	books: any[] = [];
	total: number = 0;
	currentPageIndex: number = 0;
	searching = true;

	pageTitle = "";
	mainseries = "";
	series = "";

	hasError = false;
	pageCount = 100;

	constructor(
		private cs: ConfigService,
		private route: ActivatedRoute,
		private us: UtilitiesService,
		private ds: DataService,
		private ms: MenuService,
		private dis: DiscountService,
	) {
		//取得組態
		cs.config$.subscribe(r => this.config = r );
	 }

	ngOnInit(): void {
		//取得路徑參數
		this.route.params.pipe(
			map(r => {
				return {
					type: r.type,
					id: r.id,
					pageIndex: parseInt(r.pageIndex),
					sort: r.sort
				};
			})
		)
		.subscribe(params => {
			this.params = params;
			//參數說明
			// path: ":type/:id/:pageIndex"
			// {type: 'series', id: 'SC1A', pageIndex: '0'}
			// 每頁資料筆數在 config.json 指定

			// console.log("params:", this.params);


			this.type = this.params.type;


			switch (this.params.type) {
				case searchTypes.series:

					// 指定類別搜尋

					this.books$ = this.ds.searchSerieBooks(this.params.id, this.params.pageIndex, this.config.recordsPerPage, this.params.sort);

					this.books$.subscribe(
						(r: any) => {
							this.total = r.total;
							this.books = r.data;

							//計算書的特價
							this.books.forEach((book, index)=>{
								var discountData = this.dis.transformData(book.discountData);
								book.bookresult = this.dis.getSpecialPrice(book.bookprice, discountData);

							});

							this.currentPageIndex = this.params.pageIndex - 1;

							// console.log(this.books);

							this.searching = false;

							//總頁數
							this.pageCount = Math.ceil(this.total / this.config.recordsPerPage);

							// console.log("取得總頁數：", this.pageCount);

						},
						(error: any) => {
							console.log("搜尋結果發生錯誤！", error);
							this.hasError = true;

							this.searching = false;
						}
					);

					//類別標題
					this.ms.getProductGroup$.subscribe(r=>{
						var m = this.ms.groups.filter(value => value.id == this.params.id)[0];
						// this.pageTitle = "類別：" + m.header + "--" + m.name;
						this.mainseries = m.header;
						this.series = m.name;
					});

					break;
				case searchTypes.keyword:

					// 搜尋作者書名
					this.books$ = this.ds.searchByKeyword(this.params.id, this.params.pageIndex, this.config.recordsPerPage, this.config.onlySearchSC);

					this.books$.subscribe(
						(r: any) => {
							this.total = r.total;
							this.books = r.data;

							//計算書的特價
							this.books.forEach((book, index)=>{
								var discountData = this.dis.transformData(book.discountData);
								book.bookresult = this.dis.getSpecialPrice(book.bookprice, discountData);

							});


							
							this.currentPageIndex = this.params.pageIndex - 1;

							// console.log("關鍵字搜尋：", this.books);

							this.searching = false;

							//總頁數
							this.pageCount = Math.ceil(this.total / this.config.recordsPerPage);

							// console.log("取得總頁數：", this.pageCount);

						},
						(error: any) => {
							console.log("搜尋結果發生錯誤！");
							this.hasError = true;

							this.searching = false;
						}
					);



					break;

				default:
					console.log("error: 無此搜尋類型！");
					//回首頁
					this.us.navigate("/index");
					break;
			}


		});
	}



	onBookImgErr(bookIndex: number){
		this.books[bookIndex].bookimg = "assets/images/defaultBookImg.png";
	}

	onPageChanged(event: any){

		var url = "/search/" + this.params.type + "/" + this.params.id + "/" + (event + 1);


		//搜尋依價格／異動日期排序
		if (this.params.sort == "price") {
			url = url + "/price"
		}
		if (this.params.sort == "price2") {
			url = url + "/price2"
		}
		if (this.params.sort == "update") {
			url = url + "/update"
		}


		this.us.navigate(url);

		// console.log("變換頁碼：", "/search/" + this.params.type + "/" + this.params.id + "/" + (event + 1));

	}

	showPagination(searching:boolean){
		return !searching && this.books.length > 0;
	}

}
