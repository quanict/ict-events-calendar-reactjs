import {TK19, TK20, TK21, TK22, PiNumber} from "./Constants";
import {toInt} from "./Helper";
import LunarDate from "./LunarDate"

export default class LunarCalculator {

  lunar: LunarDate;  

  constructor() {
    this.lunar = new LunarDate(1,1,1,0,2);
  }
  
    findLunarDate(jd:number, ly: any) {
      const FIRST_DAY = this.jdn(25, 1, 1800); // Tet am lich 1800
      const LAST_DAY = this.jdn(31, 12, 2199);
  
      if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
        return new LunarDate(0, 0, 0, 0, jd);
      }
      var i = ly.length-1;
      while (jd < ly[i].jd) {
        i--;
      }
      var off = jd - ly[i].jd;
      return new LunarDate(ly[i].day+off, ly[i].month, ly[i].year, ly[i].leap, jd);
    }
  
    getYearInfo(yyyy:number) {
      let yearCode;
      if (yyyy < 1900) {
        yearCode = TK19[yyyy - 1800];
      } else if (yyyy < 2000) {
        yearCode = TK20[yyyy - 1900];
      } else if (yyyy < 2100) {
        yearCode = TK21[yyyy - 2000];
      } else {
        yearCode = TK22[yyyy - 2100];
      }
      return this.decodeLunarYear(yyyy, yearCode);
    }
  
    decodeLunarYear(yy:number, k:number) {
      var monthLengths, regularMonths, offsetOfTet, leapMonth, leapMonthLength, solarNY, currentJD, j, mm;
      var ly = [];
      monthLengths = [29, 30];
      regularMonths = [12];
      offsetOfTet = k >> 17;
      leapMonth = k & 0xf;
      leapMonthLength = monthLengths[k >> 16 & 0x1];
      solarNY = this.jdn(1, 1, yy);
      currentJD = solarNY+offsetOfTet;
      j = k >> 4;
  
      for(let i = 0; i < 12; i++) {
        regularMonths[12 - i - 1] = monthLengths[j & 0x1];
        j >>= 1;
      }
      
      if (leapMonth == 0) {
        for(mm = 1; mm <= 12; mm++) {
          ly.push(new LunarDate(1, mm, yy, 0, currentJD));
          currentJD += regularMonths[mm-1];
        }
      } else {
        for(mm = 1; mm <= leapMonth; mm++) {
          ly.push(new LunarDate(1, mm, yy, 0, currentJD));
          currentJD += regularMonths[mm-1];
        }
        ly.push(new LunarDate(1, leapMonth, yy, 1, currentJD));
        currentJD += leapMonthLength;
        for(mm = leapMonth+1; mm <= 12; mm++) {
          ly.push(new LunarDate(1, mm, yy, 0, currentJD));
          currentJD += regularMonths[mm-1];
        }
      }
      return ly;
    }
  
    jdn(dd:number, mm:number, yy:number) {
      var a = toInt((14 - mm) / 12);
      var y = yy+4800-a;
      var m = mm+12*a-3;
      var jd = dd + toInt((153*m+2)/5) + 365*y + toInt(y/4) - toInt(y/100) + toInt(y/400) - 32045;
      return jd;
      //return 367*yy - INT(7*(yy+INT((mm+9)/12))/4) - INT(3*(INT((yy+(mm-9)/7)/100)+1)/4) + INT(275*mm/9)+dd+1721029;
    }
  
    jdn2date(jd:number) {
      var Z, A, alpha, B, C, D, E, dd, mm, yyyy, F;
      Z = jd;
      if (Z < 2299161) {
        A = Z;
      } else {
        alpha = toInt((Z-1867216.25)/36524.25);
        A = Z + 1 + alpha - toInt(alpha/4);
      }
      B = A + 1524;
      C = toInt( (B-122.1)/365.25);
      D = toInt( 365.25*C );
      E = toInt( (B-D)/30.6001 );
      dd = toInt(B - D - toInt(30.6001*E));
      if (E < 14) {
        mm = E - 1;
      } else {
        mm = E - 13;
      }
      if (mm < 3) {
        yyyy = C - 4715;
      } else {
        yyyy = C - 4716;
      }
      return [dd, mm, yyyy];
    }
  
    /* Compute the sun segment at start (00:00) of the day with the given integral Julian day number.
     * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
     * The function returns a number between 0 and 23.
     * From the day after March equinox and the 1st major term after March equinox, 0 is returned.
     * After that, return 1, 2, 3 ...
     */
    getSunLongitude(dayNumber:number, timeZone:number) {
      const sunLng = this.sunLongitude(dayNumber - 0.5 - timeZone/24.0) / PiNumber * 12;
      return toInt(sunLng);
    }
  
      /** 
     * Compute the longitude of the sun at any time.
     * Parameter: floating number jdn, the number of days since 1/1/4713 BC noon
     * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
    */
    sunLongitude(jdn:number) {
      let T, T2, dr, M, L0, DL, L;
      T = (jdn - 2451545.0 ) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
      T2 = T*T;
      dr = PiNumber/180; // degree to radian
      M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2; // mean anomaly, degree
      L0 = 280.46645 + 36000.76983*T + 0.0003032*T2; // mean longitude, degree
      DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
      DL = DL + (0.019993 - 0.000101*T)*Math.sin(dr*2*M) + 0.000290*Math.sin(dr*3*M);
      L = L0 + DL; // true longitude, degree
      L = L*dr;
      L = L - PiNumber*2*(toInt(L/(PiNumber*2))); // Normalize to (0, 2*PI)
      return L;
    }
  }