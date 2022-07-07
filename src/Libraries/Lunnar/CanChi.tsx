import {CAN, GIO_HD, CHI, TIETKHI} from "./Constants";
import LunarCalculator from "./LunarCalculator"

class CanChi  extends LunarCalculator {
    
  getCanChi(lunar:any=null) {
      if( typeof lunar === 'undefined'){
        lunar = this.lunar;
      }
      let dayName, monthName, yearName;
      dayName = CAN[(lunar.jd + 9) % 10] + " " + CHI[(lunar.jd+1)%12];
      monthName = CAN[(lunar.year*12+lunar.month+3) % 10] + " " + CHI[(lunar.month+1)%12];
      if (lunar.leap == 1) {
        monthName += " (nhuận)";
      }
      yearName = this.getYearCanChi();
      return [dayName, monthName, yearName];
    }
  
    getYearCanChi(year:number=0) : string {
      if( typeof year === 'undefined'){
        year = this.lunar.year;
      }
      return CAN[(year+6) % 10] + " " + CHI[(year+8) % 12];
    }
  
    getDayName() {
      if (this.lunar.day == 0) {
        return "";
      }
      const cc = this.getCanChi();
      return `Ngày ${cc[0]}, tháng ${cc[1]}, năm ${cc[2]}`;
    }
  
    get YearName(){
      const {year} = this.lunar;
      return CAN[(year+6) % 10] + " " + CHI[(year+8) % 12];
    }
  
    getGioHoangDao() {
      const {jd} = this.lunar;
      const chiOfDay = (jd+1) % 12;
      const gioHD = GIO_HD[chiOfDay % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
      const ret = [];
  
      for (let i = 0; i < 12; i++) {
        if (gioHD.charAt(i) == '1') {
          let timeName = CHI[i];
          let timeBegin = (i*2+23)%24;
          let timeEnd = (i*2+1)%24;
  
          ret.push(`${timeName} (${timeBegin}-${timeEnd}`);
        }
      }
      return ret;
    }
  
    get TietKhi(){
      const sunLng = this.getSunLongitude(this.lunar.jd+1, 7.0);
      return TIETKHI[sunLng];
    }
  }
  