import * as moment from 'moment';

export class DateUtils {
    static getDateDiff(date_past: any): string {
        let curDate: Date = new Date();

        let returnStr = "";

        let pastdateMoment = moment(date_past);
        let currdateMoment = moment(curDate);

        if (pastdateMoment.isValid() === true && currdateMoment.isValid() === true) {
          let years = currdateMoment.diff(pastdateMoment, 'years');

          let months = currdateMoment.diff(pastdateMoment, 'months');

          let days = currdateMoment.diff(pastdateMoment, 'days');

          let hours = currdateMoment.diff(pastdateMoment, 'hours');

          let minutes = currdateMoment.diff(pastdateMoment, 'minutes');

          if(years> 0) {
            returnStr = years + " years ago";
          } else if(months > 0) {
            returnStr = months + " months ago";
          } else if(days > 0) {
            returnStr = days + " days ago";
          } else if(hours > 0) {
            returnStr = hours + " hours ago";
          } else if(minutes > 0) {
            returnStr = minutes + " minutes ago";
          } else {
            returnStr = "0 minutes ago";
          }
         
        }
        return returnStr;
    }
}