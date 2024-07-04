import { CartItem } from './cart.service';
import { Injectable } from '@angular/core';

export class Book {
  author: string = '';
  // binding: string = "";
  img: string = '';
  // isbn: string = "";
  name: string = '';
  id: string = '';
  // pages: string = "";
  priceVip: number = 0;
  priceSpecial: number = 0;
  price: number = 0;
  priceFinal: number = 0;
  // subTotal: number = 0;
  // publisher: string = "";
  pubdate: string = '';
  // series: string = "";
  // size: string = "";
  status: string = '';
  // unit: string = "";
}

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  // 欄位對照物件
  fields = [
    {
      title: '作者',
      from: 'bookauthor',
      to: 'author',
      type: 'string',
    },
    /* {
			title: "裝訂",
			from: "bookbinding",
			to: "binding",
			type: "string"
		}, */
    {
      title: '圖片',
      from: 'bookimg',
      to: 'img',
      type: 'string',
    },
    /* {
			title: "ISBN",
			from: "bookisbn",
			to: "isbn",
			type: "string"
		}, */
    {
      title: '書名',
      from: 'bookname',
      to: 'name',
      type: 'string',
    },
    {
      title: '書號',
      from: 'bookno',
      to: 'id',
      type: 'string',
    },
    /* {
			title: "頁數",
			from: "bookpages",
			to: "pages",
			type: "string"
		}, */
    {
      title: 'VIP 價',
      from: 'bookprcvip',
      to: 'priceVip',
      type: 'number',
    },
    {
      title: '特價',
      from: 'bookresult',
      to: 'priceSpecial',
      type: 'number',
    },
    {
      title: '定價',
      from: 'bookprice',
      to: 'price',
      type: 'number',
    },
    {
      title: '單價（結帳用）',
      from: '',
      to: 'priceFinal',
      type: 'default-0',
    },
    /* {
			title: "小計",
			from: "",
			to: "subTotal",
			type: "default-0"
		}, */
    /* {
			title: "出版公司",
			from: "bookpublisher",
			to: "publisher",
			type: "string"
		}, */
    {
      title: '出版日期',
      from: 'bookpubyear',
      to: 'pubdate',
      type: 'string',
    },

    /* {
			title: "類別",
			from: "bookseries",
			to: "series",
			type: "string"
		}, */
    /* {
			title: "尺寸",
			from: "booksize",
			to: "size",
			type: "string"
		}, */
    {
      title: '庫存狀態',
      from: 'bookstatus',
      to: 'status',
      type: 'string',
    },
    /* {
			title: "單位",
			from: "bookunite",
			to: "unit",
			type: "string"
		} */
  ];

  constructor() {}

  //把來自主機的資料形式轉成專案使用的格式
  transformData(oridata: any): Book {
    if (oridata) {
      var book: any = {};

      this.fields.forEach((field, index) => {
        switch (field.type) {
          case 'number':
            book[field.to] = Number(oridata[field.from]);
            break;

          case 'default-0':
            if (book[field.to]) {
              //有資料，不變動
            } else {
              book[field.to] = 0;
            }
            break;

          /* case "boolean":
						if(book.from=="discoupon"){
							book[field.to] = book[field.from] == "Y";
						}
						break; */

          default:
            book[field.to] = oridata[field.from];
            break;
        }
      });

      return book as Book;
    } else {
      return new Book();
    }
  }
}
