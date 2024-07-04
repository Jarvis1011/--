import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService, Order } from "../../services/cart.service";
import { CartDataService } from "../../services/cart-data.service";

@Component({
	selector: 'app-order-obj-tree',
	templateUrl: './order-obj-tree.component.html',
	styleUrls: ['./order-obj-tree.component.css']
})
export class OrderObjTreeComponent implements OnInit {

	@Input() order!: Order;

	cart: Array<CartItem> = [];


	constructor() { }

	ngOnInit(): void {

		this.cart = this.order.cart;
	}



	//測試用
	getReceiver(){
		return this.order.receiver as any;
	}

}
