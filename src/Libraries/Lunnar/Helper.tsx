
// import LunarCalculator from "./LunarCalculator";
// import LunarDate from './LunarDate';
// // import {CAN, CHI} from "./Constants";
// import CanChi from "./CanChi";

// const lunarCalc = new LunarCalculator();
// const canChi = new CanChi();

// var FIRST_DAY = lunarCalc.jdn(25, 1, 1800); // Tet am lich 1800
// var LAST_DAY = lunarCalc.jdn(31, 12, 2199);

// /* Discard the fractional part of a number, e.g., INT(3.2) = 3 */
export function toInt(d:number) {
	return Math.floor(d);
}


// export function findLunarDate(jd:any, ly:any) {
// 	if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
// 		return new LunarDate(0, 0, 0, 0, jd);
// 	}
// 	var i = ly.length-1;
// 	while (jd < ly[i].jd) {
// 		i--;
// 	}
// 	var off = jd - ly[i].jd;
// 	const ret = new LunarDate(ly[i].day+off, ly[i].month, ly[i].year, ly[i].leap, jd);
// 	return ret;
// }

// function getLunarDate(dd:any, mm:any, yyyy:any) {
// 	var ly, jd;
// 	if (yyyy < 1800 || 2199 < yyyy) {
// 		//return new LunarDate(0, 0, 0, 0, 0);
// 	}
// 	ly = lunarCalc.getYearInfo(yyyy);
// 	jd = lunarCalc.jdn(dd, mm, yyyy);
// 	if (jd < ly[0].jd) {
// 		ly = lunarCalc.getYearInfo(yyyy - 1);
// 	}
// 	return findLunarDate(jd, ly);
// }

// function getMonth(mm:any, yy:any) {
// 	var ly1, ly2, tet1, jd1, jd2, mm1, yy1, result, i;
// 	if (mm < 12) {
// 		mm1 = mm + 1;
// 		yy1 = yy;
// 	} else {
// 		mm1 = 1;
// 		yy1 = yy + 1;
// 	}
// 	jd1 = lunarCalc.jdn(1, mm, yy);
// 	jd2 = lunarCalc.jdn(1, mm1, yy1);
// 	ly1 = lunarCalc.getYearInfo(yy);
// 	//alert('1/'+mm+'/'+yy+' = '+jd1+'; 1/'+mm1+'/'+yy1+' = '+jd2);
// 	tet1 = ly1[0].jd;
// 	result = new Array();
// 	if (tet1 <= jd1) { /* tet(yy) = tet1 < jd1 < jd2 <= 1.1.(yy+1) < tet(yy+1) */
// 		for (i = jd1; i < jd2; i++) {
// 			result.push(findLunarDate(i, ly1));
// 		}
// 	} else if (jd1 < tet1 && jd2 < tet1) { /* tet(yy-1) < jd1 < jd2 < tet1 = tet(yy) */
// 		ly1 = lunarCalc.getYearInfo(yy - 1);
// 		for (i = jd1; i < jd2; i++) {
// 			result.push(findLunarDate(i, ly1));
// 		}
// 	} else if (jd1 < tet1 && tet1 <= jd2) { /* tet(yy-1) < jd1 < tet1 <= jd2 < tet(yy+1) */
// 		ly2 = lunarCalc.getYearInfo(yy - 1);
// 		for (i = jd1; i < tet1; i++) {
// 			result.push(findLunarDate(i, ly2));
// 		}
// 		for (i = tet1; i < jd2; i++) {
// 			result.push(findLunarDate(i, ly1));
// 		}
// 	}
// 	return result;
// }

// function getDayName(lunarDate:any) {
// 	if (lunarDate.day == 0) {
// 		return "";
// 	}
// 	var cc = canChi.getCanChi(lunarDate);
// 	var s = "Ngày " + cc[0] +", tháng "+cc[1] + ", năm " + cc[2];
// 	return s;
// }

// function getYearCanChi(year:number) {
// 	return CAN[(year+6) % 10] + " " + CHI[(year+8) % 12];
// }


