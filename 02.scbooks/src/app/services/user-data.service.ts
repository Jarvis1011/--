import { Injectable } from '@angular/core';
import * as moment from 'moment';

export class User {
  memberType: string = '';
  expiredDate: string = '1900-01-01';
  ckeckState: string = '';
  id: string = '';
  id2: string = '';
  account: string = '';
  password: string = '';
  realname: string = '';
  nickname: string = '';
  sex: string = '';
  birthday: string = '';
  antecedent: string = '';
  city: string = '';
  address: string = '';
  tel_h_post: string = '';
  tel_h: string = '';
  tel_o_post: string = '';
  tel_o: string = '';
  tel_o_ext: string = '';
  cellphone: string = '';
  email: string = '';
  isSubscribed: boolean = false;
  isVip: boolean = false;
  VipStart: string = '';
  VipEnd: string = '';
  usedVipCoupon: boolean = false;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  //日期格式
  dateFormat = 'YYYY-MM-DD';
  dateSlash = 'YYYY/MM/DD';

  // 欄位對照物件
  userFields = [
    {
      title: '會員類別',
      from: 'MembType',
      to: 'memberType',
      update: '',
      type: 'string',
    },
    {
      title: '會員到期日',
      from: 'MembTypeDate',
      to: 'expiredDate',
      update: '',
      type: 'DateString',
    },
    {
      title: '認證狀態',
      from: 'MembCheckStatus',
      to: 'ckeckState',
      update: '',
      type: 'string',
    },
    {
      title: '會員編號',
      from: 'MembSEQ',
      to: 'id',
      update: 'MemberSEQ',
      type: 'string',
    },
    {
      title: '會員代號',
      from: 'MembTNo',
      to: 'id2',
      update: '',
      type: 'string',
    },
    {
      title: '帳號',
      from: 'MembAcct',
      to: 'account',
      update: 'MemberAcct',
      type: 'string',
    },
    {
      title: '密碼',
      from: 'MembPass',
      to: 'password',
      update: 'MemberPass',
      type: 'string',
    },
    {
      title: '姓名',
      from: 'MembRealName',
      to: 'realname',
      update: 'RealName',
      type: 'string',
    },
    {
      title: '暱稱',
      from: 'MembPetName',
      to: 'nickname',
      update: 'PetName',
      type: 'string',
    },
    {
      title: '性別',
      from: 'MembSex',
      to: 'sex',
      update: 'Sex',
      type: 'string',
    },
    {
      title: '生日',
      from: 'MembBirthDT',
      to: 'birthday',
      update: 'BirthDT',
      type: 'DateString',
    },
    {
      title: '學歷',
      from: 'MembAntecedent',
      to: 'antecedent',
      update: 'Antecedent',
      type: 'string',
    },
    {
      title: '縣市',
      from: 'MembAddressLocal',
      to: 'city',
      update: 'AddressLocal',
      type: 'string',
    },
    {
      title: '地址',
      from: 'MembAddress',
      to: 'address',
      update: 'Address',
      type: 'string',
    },
    {
      title: '電話(H)區號',
      from: 'MembHomeTelPost',
      to: 'tel_h_post',
      update: 'HomeTelPost',
      type: 'string',
    },
    {
      title: '電話(H)',
      from: 'MembHomeTelNumber',
      to: 'tel_h',
      update: 'HomeTelNumber',
      type: 'string',
    },
    {
      title: '電話(O)區號',
      from: 'MembOfficeTelPost',
      to: 'tel_o_post',
      update: 'OfficeTelPost',
      type: 'string',
    },
    {
      title: '電話(O)',
      from: 'MembOfficeTelNumber',
      to: 'tel_o',
      update: 'OfficeTelNumber',
      type: 'string',
    },
    {
      title: '電話(O)分機',
      from: 'MembOfficeTelExt',
      to: 'tel_o_ext',
      update: 'OfficeTelExt',
      type: 'string',
    },
    {
      title: '手機',
      from: 'MembMobile',
      to: 'cellphone',
      update: 'Mobile',
      type: 'string',
    },
    {
      title: 'e-mail',
      from: 'MembeMail',
      to: 'email',
      update: 'eMail',
      type: 'string',
    },
    {
      title: '訂閱電子報',
      from: 'MembePaper',
      to: 'isSubscribed',
      update: 'ePaper',
      type: 'boolean',
    },
    {
      title: '會員VIP',
      from: 'Membisvip',
      to: 'isVip',
      update: 'isVip',
      type: 'boolean',
    },
    {
      title: 'VIP開始',
      from: 'VipStart',
      to: 'VipStart',
      update: '',
      type: 'DateString',
    },
    {
      title: 'VIP結束',
      from: 'VipEnd',
      to: 'VipEnd',
      update: '',
      type: 'DateString',
    },
    {
      // Y=ture代表還沒使用過，N=fales代表使用過
      title: '三本書兌換券',
      from: 'Membthreebooks',
      to: 'usedVipCoupon',
      update: 'Membthreebooks',
      type: 'boolean',
    },
  ];

  constructor() {}

  //把來自主機的資料形式轉成專案使用的格式
  transformData(oridata: any): User | undefined {
    if (oridata) {
      var user: any = {};

      this.userFields.forEach((field, index) => {
        switch (field.type) {
          case 'DateString':
            // user[field.to] = new Date(oridata[field.from]);

            //注意：html 中 input type="date" 只能連結標準字串格式的日期：1980-7-15，不能用 1980/7/15，
            //所以日期資料使用文字格式儲存，並將斜線轉成短線
            user[field.to] = moment(new Date(oridata[field.from])).format(
              this.dateFormat
            );
            break;

          case 'boolean':
            user[field.to] =
              oridata[field.from]?.toUpperCase() == 'Y' ? true : false;
            break;

          default:
            user[field.to] = oridata[field.from];
            break;
        }
      });

      return user as User;
    } else {
      return undefined;
    }
  }

  // 把 json 資料轉成 User
  transformJSONtoUser(jsonStr: string): User | undefined {
    if (jsonStr) {
      var user: any = JSON.parse(jsonStr);

      this.userFields.forEach((field, index) => {
        switch (field.type) {
          case 'DateString':
            // user[field.to] = new Date(user[field.to]);
            break;

          /* case "boolean":
						user[field.to] = (user[field.to] == "true") ? true : false;
						break; */

          default:
            break;
        }
      });

      return user as User;
    } else {
      return undefined;
    }
  }

  // 把專案的user資料轉成主機所需格式
  transformDataToServer(user: any): any {
    var tempUser = user;
    var result: any = {};

    this.userFields.forEach((field, index) => {
      //有上傳欄位的才處理
      if (field.update) {
        switch (field.type) {
          case 'DateString':
            // result[field.from] = moment(tempUser[field.to]).format(this.dateSlash);
            result[field.update] = tempUser[field.to];
            break;

          case 'boolean':
            result[field.update] = tempUser[field.to] ? 'Y' : 'N';
            break;

          default:
            result[field.update] = tempUser[field.to];
            break;
        }
      }
    });

    //修改性別資料
    if (result['Sex'] == '男') {
      result['Sex'] = 'M';
    } else if (result['Sex'] == '女') {
      result['Sex'] = 'F';
    }

    // 處理 isVip
    if (tempUser.isVip) {
      result['isVip'] = '01'; // 如果 isVip 為 true，設置為 '01'
    } else {
      result['isVip'] = '00'; // 如果 isVip 為 false，移除該屬性
    }

    return result;
  }
}
