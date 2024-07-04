import { Injectable } from '@angular/core';
import { Order } from "./cart.service";
import { UserService } from "./user.service";

@Injectable({
	providedIn: 'root'
})
export class OrderDataService {

	// 欄位對照物件
	fields = [
		{
			title: "使用者帳號",
			from: "id",
			to: "userid",
			type: "string"
		},
		{
			title: "收件人",
			from: "name",
			to: "realname",
			type: "string"
		},
		{
			title: "電子郵件",
			from: "email",
			to: "email",
			type: "string"
		},
		{
			title: "電話",
			from: "tel",
			to: "cellphone",
			type: "string"
		},
		{
			title: "寄送地址",
			from: "addr",
			to: "cityandaddr",
			type: "string"
		},
		{
			title: "付費方式",
			from: "PayType",
			to: "payType",
			type: "string"
		},
		{
			title: "商品內容",
			from: "ProdTitle",
			to: "cart",
			type: "string"
		},
		{
			title: "總金額",
			from: "amount",
			to: "orderTotalPrice",
			type: "number"
		},
		{
			title: "刷卡狀態",
			from: "CardState",
			to: "cardState",
			type: "string"
		},
		{
			title: "收費完成（1／0）",
			from: "MoneyOK",
			to: "payed",
			type: "number"
		},
		{
			title: "備註",
			from: "REMK",
			to: "note",
			type: "string"
		}
		/* {
			title: "虛擬帳號",
			from: "VID",
			to: "vid",
			type: "string"
		},
		{
			title: "XXX",
			from: "co",
			to: "co",
			type: "string"
		},
		{
			title: "XXX",
			from: "cos",
			to: "cos",
			type: "string"
		} */

	];

	constructor(
		private us: UserService,
	) { }


	// 把專案的訂單資料轉成主機所需格式
	transformDataToServer(order: any): any {

		var temp = order;
		var result: any = {};

		this.fields.forEach((field, index) => {

			switch (field.type) {
				case "DateString":
					// result[field.from] = moment(tempUser[field.to]).format(this.dateSlash);
					result[field.from] = temp[field.to];
					break;

				/* case "boolean":
					result[field.from] = temp[field.to] ? "Y" : "N";
					break; */

				case "number":
					// result[field.from] = temp[field.to] ? "Y" : "N";
					if (field.to == "payed") {
						result[field.from] = temp[field.to] ? 1 : 0;
					} else {
						result[field.from] = temp[field.to];
					}
					break;

				default:
					result[field.from] = temp[field.to] ? temp[field.to] : "";
					break;
			}

		});


		//地址資料
		result["addr"] = temp.city + temp.address;

		//購物車資料
		result["ProdTitle"] = JSON.stringify(temp.cart);

		//收件者
		result["name"] = temp.receiver.realname;
		result["addr"] = temp.receiver.city + temp.receiver.address;
		result["tel"] = temp.receiver.cellphone;
		result["email"] = temp.receiver.email;


		return result;
	}


	//
}
