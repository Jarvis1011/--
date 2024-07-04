import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ShippingFeeService {
  constructor() {}

  //運費有預設運費和活動運費，在活動期間使用預設運費
  getCurrentShippingFee(config: any) {
    var during: boolean = this.isBetween(
      config.shippingFeeData.activity.date1,
      config.shippingFeeData.activity.date2
    );

    if (during) {
      return config.shippingFeeData.activity.fee;
    } else {
      return config.shippingFeeData.default;
    }
  }

  //今天是不是在兩個指定日期區間內
  isBetween(date1: string, date2: string): boolean {
    var d1 = date1.replace(/\//g, '-');
    var d2 = date2.replace(/\//g, '-');

    var today = moment().valueOf();

    var result = moment(today).isBetween(d1, d2, 'day', '[]');

    return result;
  }

  getUsedVipCouponShippingFee(config: any) {
    return config.shippingFeeData.vipActivity;
  }
}
