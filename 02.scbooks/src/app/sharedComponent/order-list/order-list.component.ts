import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderManageService } from "../../services/order-manage.service";
import { OrderStatus } from "../../services/cart.service";
declare let bootstrap: any;

@Component({
	selector: 'app-order-list',
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

	//訂單資料
	@Input() list!: any[];


	//目前頁碼
	@Input() currentPageIndex = 0;

	//每頁資料筆數
	@Input() recordsPerPage = 10;

	//總頁數
	@Input() pageCount = 10;

	//顯示會員id
	@Input() showUserID = false;

	//是否是管理員
	@Input() isManager = false;


	//輸出事件
	@Output() pageChanged: EventEmitter<number>;


	//可折疊 Bootstrap 5 元素
	collapseList: Array<any> = []; 

	//可編輯狀態
	isEditing: boolean = false;
	editingOrderid: string = "";

	orderStatusArr: Array<string> = [];


	//********** */
	//編輯中資料
	private edit_order: any;
	private edit_orderid: string = "";
	edit_bookbinding: string = "";
	edit_orderok: boolean = false;

	uploading: boolean = false;
	hasError: boolean = false;




	constructor(
		private os: OrderManageService,
	) {

		this.pageChanged  = new EventEmitter();

		for (let item in OrderStatus) {
			this.orderStatusArr.push((OrderStatus as any)[item]);
		}
	}

	ngOnInit(): void {

		this.os.isEditing$.subscribe(r => {
			this.isEditing = r;
			this.editingOrderid = this.os.editingOrderId;
		});
	}


	// 初始化 Bootstrap 折疊元件
	iniCollapseEle() {
		var collapseElementList = [].slice.call(document.querySelectorAll('.collapse.order-detail'));

		// console.log("載入完成：", collapseElementList);

		this.collapseList = collapseElementList.map((collapseEl) => {
			return new bootstrap.Collapse(collapseEl, {
				toggle: false
			});
		});

		// console.log("載入完成：", this.collapseList);

	}

	// 換頁
	onPageChanged(event: any){
		// console.log("change:", event);
		
		this.pageChanged.emit(event);
	}

	showPagination(){
		return this.list ? this.list.length > 0 : false;
	}


	// 全部展開／隱藏訂單明細
	showAll(){
		// console.log("click:", this.collapseList);
		this.iniCollapseEle();
		
		this.collapseList.forEach((ele, index)=>{
			// console.log("show:", index);
			
			ele.show();
		})
	}
	hideAll(){
		this.iniCollapseEle();

		this.collapseList.forEach((ele, index)=>{
			ele.hide();
		})
	}

	//檢查資料類型以相容舊訂單（）
	isNumber(data: any):boolean{
		return !isNaN(data);
	}
	typeof(data:any):string{
		return typeof data;
	}


	//************** */
	//編輯訂單
	clickEdit(orderid: string){

		this.hasError = false;
		this.os.setEditing(true, orderid);

		this.editOrder(orderid);
	}

	editOrder(orderid: string){
		this.edit_order = this.list.filter((value, indes) => value.orderid == orderid)[0];
		this.edit_orderid = orderid;
		this.edit_bookbinding = this.edit_order.bookbinding;
		this.edit_orderok = this.edit_order.orderok == "True";
		// console.log(this.edit_bookbinding, this.edit_orderok);
	}



	clickOK(orderid: string){

		this.uploading = true;

		//上傳訂單到伺服器
		//成功才更新本地端資料，否則取消
		this.os.updateOrder$(this.edit_orderid, this.edit_bookbinding, this.edit_orderok).subscribe(
			(r)=>{

				this.uploading = false;

				// console.log("訂單更新完成：", r);				
				
				//取消編輯狀態
				this.os.setEditing(false, "");

				//儲存本地端資料
				this.edit_order.orderok = this.edit_orderok ? "True" : "False";
				this.edit_order.bookbinding = this.edit_bookbinding;
			},
			(error)=>{
				this.uploading = false;
				this.hasError = true;

				console.log("訂單更新失敗！", error);
				
			}
		);
		
	}
	clickCancel(){
		this.os.setEditing(false, "");
	}

}
