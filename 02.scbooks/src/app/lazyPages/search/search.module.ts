import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ErrorMsgComponent } from "../../sharedComponent/error-msg/error-msg.component";

import { RouterModule } from "@angular/router";

// 分頁元件
import { SharedModule } from "../../shared-module/shared-module.module";


@NgModule({
	declarations: [
		SearchComponent,
		ErrorMsgComponent,
	],
	imports: [
		CommonModule,
		SharedModule,

		RouterModule.forChild([
			{ path: "", component: SearchComponent },
			{ path: ":type/:id/:pageIndex", component: SearchComponent },
			{ path: ":type/:id/:pageIndex/:sort", component: SearchComponent },
		])
	]
})
export class SearchModule { }
