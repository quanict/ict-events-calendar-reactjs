import moment from 'moment';
import lunar from '../../Libraries/Lunnar/lunar';

export const Holidays = [
    { solar:"YEAR-01-01", title: "Tết Dương Lịch" },
    { solar:"2022-01-02", offset:true },
    { solar:"2022-01-03", offset:true },

    { solar:"2022-01-29", title: "Tết Nguyên Đán" },
    { solar:"2022-01-30", title: "Tết Nguyên Đán" },
    { solar:"2022-01-31", title: "Tết Nguyên Đán" },
    { solar:"2022-02-01", title: "Tết Nguyên Đán" },
    { solar:"2022-02-02", title: "Tết Nguyên Đán" },
    { solar:"2022-02-03", title: "Tết Nguyên Đán" },
    { solar:"2022-02-04", title: "Tết Nguyên Đán" },
    { solar:"2022-02-05", title: "Tết Nguyên Đán" },
    { solar:"2022-02-06", title: "Tết Nguyên Đán" },

    { lunar:"YEAR-03-10", title: "Giỗ Tổ Hùng Vương" },
    { lunar:"YEAR-03-11", title: "Nghỉ Giỗ Tổ Hùng Vương" },

    { solar:"YEAR-04-30", title: "Ngày Thống nhất đất nước" },
    { solar:"YEAR-05-01", title: "Ngày Quốc tế Lao động" },
    { solar:"2022-05-02", title: "Nghỉ Ngày Thống nhất" },
    { solar:"2022-05-03", title: "Nghỉ Ngày Quốc tế Lao động" },

    { solar:"2022-09-01", title: "Nghỉ Ngày Quốc khánh" },
    { solar:"YEAR-09-02", title: "Ngày Quốc khánh" },
];

let events : Array<CalendarEvent> = [];


Holidays.map((event)=>{
    //const row: { title: string; lunar?: any; solar?: any, date?:any, type?: string } = { ...event };
    let row : CalendarEvent = event as CalendarEvent;
    row.type = "holiday";

    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if( row.solar ){
        row.solar = row.solar.replace("YEAR", year).replace("MONTH", month);
        row.date = moment(row.solar);
        events.push(row); return true;
    }

    if( row.lunar ){
        row.lunar = row.lunar.replace("YEAR", year).replace("MONTH", month);
        const date = moment(row.lunar);
        row.date = lunar(parseInt(date.format('D')), parseInt(date.format('M')));
        events.push(row); return true;
    }
    return true;
});

export {events};
