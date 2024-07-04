import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderObjTreeComponent } from "../sharedComponent/order-obj-tree/order-obj-tree.component";


@NgModule({
	declarations: [
		OrderObjTreeComponent,

	],
	imports: [
		CommonModule
	],
	exports: [
		OrderObjTreeComponent,
	]
})
export class OrderTreeModule { }
