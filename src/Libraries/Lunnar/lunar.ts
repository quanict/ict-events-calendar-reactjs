//import LunarDate from "./LunarDate";
import moment, { Moment } from "moment";
import {TK19, TK20, TK21, TK22, PiNumber} from "./Constants";
import {CAN, GIO_HD, CHI, TIETKHI} from "./Constants";

export namespace Lunar {
    
    class LunarData {
        day: number;
        month: number;
        year: number;
        leap: number;
        jd: number;
      
        constructor(dd:number, mm:number, yy:number, leap:number, jd:number) {
          this.day = dd;
          this.month = mm;
          this.year = yy;
          this.leap = leap;
          this.jd = jd;
        }
    }

    interface LunarCalculateActions {
        /* Compute the sun segment at start (00:00) of the day with the given integral Julian day number.
        * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
        * The function returns a number between 0 and 23.
        * From the day after March equinox and the 1st major term after March equinox, 0 is returned.
        * After that, return 1, 2, 3 ...
        */
        sunLongitude(jdn:number): number;
        /* Compute the sun segment at start (00:00) of the day with the given integral Julian day number.
        * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
        * The function returns a number between 0 and 23.
        * From the day after March equinox and the 1st major term after March equinox, 0 is returned.
        * After that, return 1, 2, 3 ...
        */
        getSunLongitude(day:number, timezone:number): number;
        jdn(dd:number, mm:number, yy:number):number;
        jdn2date(jd:number): number[];
        findLunarDate(jd:number, ly: any): LunarData;
        decodeLunarYear(yy:number, k:number):LunarData[];
        getYearInfo(yyyy:number):LunarData[];
        getSolarDate(dd:number, mm:number, yyyy:number) : Date;

    }
      
    class LunarCalc implements LunarCalculateActions {
        protected lunar: LunarData;  
        
        constructor(...args: any[]) {
            this.lunar = new LunarData(1,1,1,0,2);
        }

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
            L = L - PiNumber*2*(Math.floor(L/(PiNumber*2))); // Normalize to (0, 2*PI)
            return L;
        }

        getSunLongitude(dayNumber:number, timeZone:number) {
            const sunLng = this.sunLongitude(dayNumber - 0.5 - timeZone/24.0) / PiNumber * 12;
            return Math.floor(sunLng);
        }

        jdn(dd:number, mm:number, yy:number) {
            var a = Math.floor((14 - mm) / 12);
            var y = yy+4800-a;
            var m = mm+12*a-3;
            var jd = dd + Math.floor((153*m+2)/5) + 365*y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) - 32045;
            return jd;
        }

        jdn2date(jd:number) {
            var Z, A, alpha, B, C, D, E, dd, mm, yyyy, F;
            Z = jd;
            if (Z < 2299161) {
              A = Z;
            } else {
              alpha = Math.floor((Z-1867216.25)/36524.25);
              A = Z + 1 + alpha - Math.floor(alpha/4);
            }
            B = A + 1524;
            C = Math.floor( (B-122.1)/365.25);
            D = Math.floor( 365.25*C );
            E = Math.floor( (B-D)/30.6001 );
            dd = Math.floor(B - D - Math.floor(30.6001*E));
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

        findLunarDate(jd:number, ly: any) {
            const FIRST_DAY = this.jdn(25, 1, 1800); // Tet am lich 1800
            const LAST_DAY = this.jdn(31, 12, 2199);
        
            if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
              return new LunarData(0, 0, 0, 0, jd);
            }
            var i = ly.length-1;
            while (jd < ly[i].jd) {
              i--;
            }
            var off = jd - ly[i].jd;
            return new LunarData(ly[i].day+off, ly[i].month, ly[i].year, ly[i].leap, jd);
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
                ly.push(new LunarData(1, mm, yy, 0, currentJD));
                currentJD += regularMonths[mm-1];
              }
            } else {
              for(mm = 1; mm <= leapMonth; mm++) {
                ly.push(new LunarData(1, mm, yy, 0, currentJD));
                currentJD += regularMonths[mm-1];
              }
              ly.push(new LunarData(1, leapMonth, yy, 1, currentJD));
              currentJD += leapMonthLength;
              for(mm = leapMonth+1; mm <= 12; mm++) {
                ly.push(new LunarData(1, mm, yy, 0, currentJD));
                currentJD += regularMonths[mm-1];
              }
            }
            return ly;
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

        getSolarDate(dd:number, mm:number, yyyy:number) : Date {
            if (yyyy < 1200 || 2199 < yyyy) {
              //return new LunarDate(0, 0, 0, 0, 0);
              return new Date();
            }
      
            var ly = this.getYearInfo(yyyy);
            var lm = ly[mm-1];
            
            if (lm.month != mm) {
              lm = ly[mm];
            }
            var ld = lm.jd + dd - 1;
            const sd = this.jdn2date(ld);
            return new Date(sd[2], sd[1], sd[0]);
        }
    }

    interface CanChiActions {
        //isAcceptable(s: string): boolean;
        getCanchi(): [day:string, month:string, year:string];
        getCanChiYear(year: number) : string;
        
        get year_name(): string;
        get gio_hoang_dao(): string[];
        get tiet_khi(): string;
    }

    export class CanChiCalc extends LunarCalc implements CanChiActions{
        getCanchi(): [day: string, month: string, year: string] {
            throw new Error("Method not implemented.");
        }
        
        getCanChiYear(year:number=0) : string {
            if( typeof year === 'undefined'){
                year = this.lunar.year;
            }
            return CAN[(year+6) % 10] + " " + CHI[(year+8) % 12];
        }

        getCanChi(lunar:any=null) {
            if( !lunar){
              lunar = this.lunar;
            }
            let dayName, monthName, yearName;
            dayName = CAN[(lunar.jd + 9) % 10] + " " + CHI[(lunar.jd+1)%12];
            monthName = CAN[(lunar.year*12+lunar.month+3) % 10] + " " + CHI[(lunar.month+1)%12];
            if (lunar.leap == 1) {
              monthName += " (nhuận)";
            }
            yearName = this.getCanChiYear();
            return [dayName, monthName, yearName];
        }

        get year_name(){
            const {year} = this.lunar;
            return CAN[(year+6) % 10] + " " + CHI[(year+8) % 12];
        }
        
        get gio_hoang_dao() {
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
        
        get tiet_khi(){
            const sunLng = this.getSunLongitude(this.lunar.jd+1, 7.0);
            return TIETKHI[sunLng];
        }
    }

    interface LunarDateActions {
        solarInitial():void;
        lunarInitial():void;
        importFromLunar(day : number, month: number, year?: number):void;
        format(format?: string):string;
        get moment(): Moment;
    }

    export class LunarDate extends CanChiCalc implements LunarDateActions {
        protected date:any=null;
        protected solar: Date|null = null;

        constructor(...args: any[]) {
            super();
            if( typeof args[1] === 'number'){
                this.importFromLunar(args[0], args[1], args[2]);
                return;
            }
            
            if( args[0] instanceof Date || typeof args[0] === 'string'){
                this.date = args[0];
                this.solarInitial();
                return;
            }
        }

        solarInitial(){
            if( this.date instanceof Date ){
              this.solar = this.date;
            } else if( typeof this.date === 'string' ){
              this.solar = new Date(this.date);
            } else {
                this.solar = new Date();
            }
            this.lunarInitial();
        }

        lunarInitial(){
            if( !this.solar){
                return;
            }
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
            year = year ? year : (new Date()).getFullYear();
            day--;
            month--;
            this.solar = this.getSolarDate(day, month, year);
            this.lunarInitial();
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
        }

        get moment(): Moment {
            return moment(this.solar);
        }

    }
}

const lunar = function(...args: any[]){
    return new Lunar.LunarDate(...args);
}
//const lunar: (...args: any[]) => LunarDate

export default lunar;
