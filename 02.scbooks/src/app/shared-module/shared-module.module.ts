import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from "../pipes/safe-html.pipe";
import { PaginationComponent } from "../sharedComponent/pagination/pagination.component";


@NgModule({
	declarations: [
		SafeHtmlPipe,
		PaginationComponent,
	],
	imports: [
		CommonModule
	],
	exports: [
		SafeHtmlPipe,
		PaginationComponent,
	]
})
export class SharedModule { }
