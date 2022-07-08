/**
 * Copyright 2004 Ho Ngoc Duc [http://come.to/duc]. All Rights Reserved.<p>
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice appears in all copies.
 * http://www.informatik.uni-leipzig.de/~duc/Java/J2ME/index.html
 * https://www.xemlicham.com/
 * https://www.informatik.uni-leipzig.de/~duc/amlich/JavaScript/
 * https://vi.wikipedia.org/wiki/Can_Chi
 */

import LunarDateTime from "./LunarDateTime";
//import Lunar from "./lunar";

const lunar = function(){

};

export default lunar;

interface fromLunar {
    (day : number, month: number): number;
    (day : number, month: number, year: number): number;
}

// let orderFn: lunar = function (cId, mId) {
//     // processing the order
//     return true // processed successfully!
// }

export const fromLunar = (day : number, month: number, year?: number) => {
    const lunarObject = new LunarDateTime();
    lunarObject.importFromLunar(day, month, year);
    return lunarObject;
}

export const fromDate = (date: Date) => {
    return new LunarDateTime(date);
}


// const lunarfn : typeof lunar = (day:number, month:number, year:number) => {
//     const lunarObject = new LunarDateTime();
//     lunarObject.importFromLunar(day, month, year);
//     return lunarObject;
// }



/**
 * console.log(`========`,lunarDate)
console.log(`========`,lunarDate.getDay, lunarDate.DayName)
console.log(lunarDate.YearName)
console.log(lunarDate.GioHoangDao)
console.log(lunarDate.TietKhi)
 */


//export = lunar;
//export as namespace lunar;