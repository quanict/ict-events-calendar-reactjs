import CanChi from "./CanChi";
import {TUAN} from "./Constants";

export default class LunarDateTime extends CanChi {
    date:any;
    solar: Date;

    constructor(date:any=null) {
      super();
      this.date = date;
      this.solar = new Date();
      this.init();
    }
  
    /**
     * Discard the fractional part of a number, e.g., INT(3.2) = 3
     */
    INT(d:any) {
      return Math.floor(d);
    }
  
    init(){
      this.initSolar();
      this.initLunar();
    }
  
    initSolar(){
      const {date} = this;
      let test = typeof this.date;
      
      if( this.date instanceof Date ){
        this.solar = this.date;
        return;
      }
      
      if( typeof this.date === 'string' ){
        this.solar = new Date(this.date);
        return;
      }

      this.solar = new Date();
    }
  
    initLunar(){
      const dd = this.solar.getDate();
      const mm = this.solar.getMonth()+1;
      const yyyy = this.solar.getFullYear();
  
      var ly, jd;
      if (yyyy < 1800 || 2199 < yyyy) {
        //return new LunarDate(0, 0, 0, 0, 0);
      }
      ly = this.getYearInfo(yyyy);
      jd = this.jdn(dd, mm, yyyy);
      if (jd < ly[0].jd) {
        ly = this.getYearInfo(yyyy - 1);
      }
  
      this.lunar = this.findLunarDate(jd, ly);
    }

    importFromLunar(day : number, month: number, year?: number){
      let dd, mm, yy, sd, ld;

     dd = day-0;
     mm = month-0;
     yy = year ? year : (new Date()).getFullYear()-0;
     this.solar = this.getSolarDate(dd, mm, yy);
     this.initLunar();
     
    }
  
    format(format?: string){
      if( !format ){
        format = "DDDD MMMM YYYY";
      }
      let day = this.lunar.day.toString();
      if( this.lunar.day < 10){
        day = `0${day}`;
      }
      let month = this.lunar.month.toString();
      if( this.lunar.month < 10){
        month = `0${month}`;
      }

      const dayInt = parseInt(day);
      const monthInt = parseInt(month);

      let output = format.slice();
      const CanChi = this.getCanChi();
      const yearCanChi = CanChi[2];
      const monthCanChi = CanChi[1];
      const dayCanChi = CanChi[0];
      
      output = output.replaceAll('YYYY', yearCanChi);
      output = output.replaceAll('MMMM', monthCanChi);
      output = output.replaceAll('DDDD', dayCanChi);

      output = output.replaceAll('YY', yearCanChi);
      output = output.replaceAll('MM', month);
      output = output.replaceAll('DD', day);

      output = output.replaceAll('d', dayInt.toString());
      output = output.replaceAll('m', monthInt.toString());



      return output;
    //return `Ngày ${cc[0]}, tháng ${cc[1]}, năm ${cc[2]}`;
      // switch(format){
      //   case 'DD-MM':
      //     return `${day}-${month}`;
      //   case 'YYYY':
      //       return CanChi[2];
      //     case 'MMMM':
      //       return monthCanChi;
      // }
    }

   
    getDayString(lunar:any, solarDay:any, solarMonth:any, solarYear:any) {
      var s;
      var dayOfWeek = TUAN[(lunar.jd + 1) % 7];
      s = dayOfWeek + " " + solarDay + "/" + solarMonth + "/" + solarYear;
      s += " -+- ";
      //s = s + "Ng\u00E0y " + lunar.day+" th\341ng "+lunar.month;
      if (lunar.leap == 1) {
        s = s + " nhu\u1EADn";
      }
      return s;
    }
  
    get day() {
      return this.lunar.day.toString();
    }

    get Day() {
      let day = this.lunar.day.toString();
      if (day.length < 2) day = "0" + day;
  
      let month = this.lunar.month.toString();
      if (month.length < 2) month = "0" + month;
  
      return `${month}/${day}`
    }

   get toString() {
    //   var s = getDayString(currentLunarDate, today.getDate(), today.getMonth()+1, today.getFullYear());
    //   s += " n\u0103m " + getYearCanChi(currentLunarDate.year);
    //   return s;
        return '';
    } 
  }