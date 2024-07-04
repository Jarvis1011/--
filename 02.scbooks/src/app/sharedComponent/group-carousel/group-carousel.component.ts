import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-group-carousel',
	templateUrl: './group-carousel.component.html',
	styleUrls: ['./group-carousel.component.css']
})
export class GroupCarouselComponent implements OnInit {

	@Input() config: any;
	@Input() groups: Array<any> = [];
	@Input() columnNum: number = 1;

	//輪播的id，為避免同一頁中有多個輪播干擾，需使用id
	@Input() ID: string = "";

	@Input() lineNum: number = 1;
	

	constructor() { 
		
	}

	ngOnInit(): void {
	}

}
