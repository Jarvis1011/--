import { Injectable } from '@angular/core';
// import { ConfigService } from "./config.service";

import * as moment from 'moment';


export class DiscountData{
	discount_value: number = 0;
	discount_date_1: string = "";
	discount_date_2: string = "";
	special_date_1: string = "";
	special_date_2: string = "";
	special_value: number = 0;
	new_date_1: string = "";
	new_date_2: string = "";
	new_value: number = 0;
	recommend_date_1: string = "";
	recommend_date_2: string = "";
	recommend_value: number = 0;

	//true: 本書不可使用折價券；false: 本書可以使用折價券
	discoupon: boolean = false;
}


@Injectable({
	providedIn: 'root'
})
export class DiscountService {


	// 欄位對照物件
	fields = [
		{
			title: "促銷折數",
			from: "discountV",
			to: "discount_value",
			type: "number"
		},
		{
			title: "促銷起日",
			from: "disSDate",
			to: "discount_date_1",
			type: "string"
		},
		{
			title: "促銷迄日",
			from: "disEDate",
			to: "discount_date_2",
			type: "string"
		},
		{
			title: "特價起日",
			from: "SPSDate",
			to: "special_date_1",
			type: "string"
		},
		{
			title: "特價迄日",
			from: "SPEDate",
			to: "special_date_2",
			type: "string"
		},
		{
			title: "特價金額",
			from: "SPv",
			to: "special_value",
			type: "number"
		},
		{
			title: "新品優惠起日",
			from: "NBSDate",
			to: "new_date_1",
			type: "string"
		},
		{
			title: "新品優惠迄日",
			from: "NBEDate",
			to: "new_date_2",
			type: "string"
		},
		{
			title: "新品優惠折數",
			from: "NBv",
			to: "new_value",
			type: "number"
		},
		{
			title: "推薦起日",
			from: "RSDate",
			to: "recommend_date_1",
			type: "string"
		},
		{
			title: "推薦迄日",
			from: "REDate",
			to: "recommend_date_2",
			type: "string"
		},
		{
			title: "推薦折數",
			from: "Rv",
			to: "recommend_value",
			type: "number"
		},
		{
			title: "不可使用折價券",
			from: "discoupon",
			to: "discoupon",
			type: "boolean"
		}
	];

	

	constructor(
		// private cs: ConfigService,
	) { 
		//取得組態檔
		// this.cs.config$.subscribe( r => this.config = r );
	}




	//把來自主機的資料形式轉成專案使用的格式
	transformData(oridata: any): DiscountData {

		if (oridata) {
			var data: DiscountData = new DiscountData();

			this.fields.forEach((field, index) => {
				switch (field.type) {
					case "number":

						switch (field.from) {
							case "discountV":
							case "NBv":
							case "Rv":
								(data as any)[field.to] = Number(oridata[field.from]) / 100;
								break;

							case "SPv":
								(data as any)[field.to] = Number(oridata[field.from]);
								break;
						}
						break;

					case "boolean":

						if(field.from=="discoupon"){
							(data as any)[field.to] = oridata[field.from] == "Y";
						}
						break;

					default:
						(data as any)[field.to] = oridata[field.from];
						break;
				}

			});

			return data;

		} else {
			return new DiscountData();
		}
	}

	//計算特價
	getSpecialPrice(price:number, discountData: DiscountData): number{
		
		//特價是永遠有的
		var dis_v = discountData.discount_value == 0 ? price : Math.round(price * discountData.discount_value);

		//以下在期間內才計價
		if (this.isBetween(discountData.special_date_1, discountData.special_date_2)) {
			var special_v = discountData.special_value == 0 ? price : discountData.special_value;			
		} else {
			special_v = price;
		}


		if(this.isBetween(discountData.new_date_1, discountData.new_date_2)){
			var new_v = discountData.new_value == 0 ? price : Math.round(price * discountData.new_value);
		}else{
			new_v = price;
		}


		if (this.isBetween(discountData.recommend_date_1, discountData.recommend_date_2)) {
			var rec_v = discountData.recommend_value == 0 ? price : Math.round(price * discountData.recommend_value);			
		} else {
			rec_v = price;
		}

		// console.log("**原價**" + price, "折扣--" + dis_v, "特價--" + special_v, "新書--" + new_v, "推薦--" + rec_v);


		return Math.min(dis_v, special_v, new_v, rec_v);
	}

	//今天是不是在兩個指定日期區間內
	isBetween(date1: string, date2: string):boolean{
		var d1 = date1.replace(/\//g, "-");
		var d2 = date2.replace(/\//g, "-");
		// var d1 = "2022-06-20";
		// var d2 = "2022-06-23";
		var today = moment().valueOf();

		var result = moment(today).isBetween(d1, d2, "day", "[]");

		// console.log("between:", moment(today).format("YYYY-MM-DD"), result);

		return result;
	}
}
