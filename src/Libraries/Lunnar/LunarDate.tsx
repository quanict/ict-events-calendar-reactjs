
export default class LunarDate {
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

