import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {

	//總頁數
	@Input() pageCount: number = 5;

	//目前頁數
	@Input() currentPageIndex: number = 0;

	//顯示的最大頁面連結數
	@Input() maxLinkCount: number = 5;

	//對齊位置（靠左：空字串，置中：'center'，靠右：'right'）
	@Input() justify: string = "";


	//輸出事件
	@Output() pageChanged: EventEmitter<number>;



	//給數字頁碼元件用的陣列
	numLinkArr: Array<number> = [];

	isSmall: boolean =  false;


	constructor() {

		this.pageChanged  = new EventEmitter();

	}

	ngOnInit(): void {


		//視窗過窄時縮小尺寸
		window.addEventListener("resize", () => {
			this.resize();
		})

		this.resize();

	}

	ngAfterViewChecked(){
		// 建立數字頁碼元件用的陣列
		// 在此處計算才不會因為初始化太早而算出錯誤的畫面
		this.numLinkArr = this.makeLinkArr();
	}

	resize(){
		var w = window.innerWidth;
		this.isSmall = (w < 576);
	}


	makeLinkArr():Array<number>{
		var result!: Array<number>;


		if(this.pageCount <= this.maxLinkCount){
			result = Array(this.pageCount).fill(0).map((v,i)=>i);
		}else{
			var start: number = 0;

			if (this.currentPageIndex <= Math.floor(this.maxLinkCount / 2)) {
				start = 0;
			} else if(this.currentPageIndex >= this.pageCount - Math.ceil(this.maxLinkCount / 2)) {
				start = this.pageCount - this.maxLinkCount;
			}else{
				start = this.currentPageIndex - Math.floor(this.maxLinkCount / 2);
			}

			result = Array(this.maxLinkCount).fill(0).map((v,i)=> start + i);

		}

		return result;
	}

	setNewPage(newIndex: number){
		try {
			this.currentPageIndex = newIndex;
			this.numLinkArr = this.makeLinkArr();
			this.pageChanged.emit(this.currentPageIndex);
		} catch (error) {
			
		}
		
	}

	first(){
		try {
			this.setNewPage(0);
		} catch (error) {
			
		}
	}
	last(){
		try {
			this.setNewPage(this.pageCount - 1);
		} catch (error) {
			
		}
	}
	pre(){
		try {
			this.setNewPage(this.currentPageIndex - 1);
		} catch (error) {
			
		}
	}
	next(){
		try {
			this.setNewPage(this.currentPageIndex + 1);
		} catch (error) {
			
		}
	}

	//顯示端點
	showEndPoint(){
		return this.pageCount > this.maxLinkCount;
	}



}
