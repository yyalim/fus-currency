import { Injectable } from '@angular/core';

import * as moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() { }

  getLastWeekDay(date?: string) {
    // returns date of last thursday if today is weekend
    // returns date of last friday if today is monday
    // returns date of the day before on other days
    let now;

    if(date !== undefined) {
      now = moment(date, DATE_FORMAT);
    } else {
      now = moment();
    }

    switch(now.day()) {
      case 0: // it's sunday
        return now.subtract(3, 'day').format(DATE_FORMAT);
      case 1: // it's monday
        return now.subtract(4, 'day').format(DATE_FORMAT);
      case 6: // it's saturday
        return now.subtract(2, 'day').format(DATE_FORMAT);
      default:
        return now.subtract(1, 'day').format(DATE_FORMAT);
    }
  }

  getToday() {
    return moment().format(DATE_FORMAT);
  }

  getLastMonthDate() {
    return moment().subtract(30, 'day').format(DATE_FORMAT);
  }
}
