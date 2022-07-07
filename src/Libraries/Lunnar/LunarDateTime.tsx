import CanChi from "./CanChi";
import {TUAN} from "./Constants";

export default class LunarDateTime extends CanChi {
    date:any;
    solar:Date;

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
  
    format(format?: string){
      let day = this.lunar.day.toString();
      if( this.lunar.day < 10){
        day = `0${day}`;
      }
      let month = this.lunar.month.toString();
      if( this.lunar.month < 10){
        month = `0${month}`;
      }

        switch(format){
          case 'DD-MM':
            return `${day}-${month}`;
        }
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
  
   get toString() {
    //   var s = getDayString(currentLunarDate, today.getDate(), today.getMonth()+1, today.getFullYear());
    //   s += " n\u0103m " + getYearCanChi(currentLunarDate.year);
    //   return s;
        return '';
    } 
  }