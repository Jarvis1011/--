import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from "../sharedComponent/order-list/order-list.component";
// 分頁元件
import { SharedModule } from "../shared-module/shared-module.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
	declarations: [
		OrderListComponent,
	],
	imports: [
		CommonModule,
		SharedModule,

		FormsModule,
		ReactiveFormsModule,

	],
	exports: [
		OrderListComponent,
	]
})
export class OrderListModule { }
