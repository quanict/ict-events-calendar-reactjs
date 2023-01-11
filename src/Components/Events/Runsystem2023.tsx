import moment from 'moment';
import lunar from '../../Libraries/Lunnar/lunar';
let events : Array<CalendarEvent> = [];

export const Holidays = [
    { solar:"2023-01-01", title: "Tết Dương Lịch" },
    { solar:"2023-01-02", offset:true },
    { solar:"2023-01-09", jp: true },
    { solar:"2023-01-20", title: "Tết Nguyên Đán" },
    { solar:"2023-01-21", title: "Tết Nguyên Đán" },
    { solar:"2023-01-22", title: "Tết Nguyên Đán" },
    { solar:"2023-01-23", title: "Tết Nguyên Đán" },
    { solar:"2023-01-24", title: "Tết Nguyên Đán" },
    { solar:"2023-01-25", title: "Tết Nguyên Đán" },
    { solar:"2023-01-26", title: "Tết Nguyên Đán" },

    

    { solar:"2023-04-29", title: "Ngày Thống nhất đất nước" },
    { solar:"2023-04-30", title: "Ngày Thống nhất đất nước" },
    { solar:"2023-05-01", title: "Ngày Thống nhất đất nước" },
    { solar:"2023-05-02", offset:true },
    { solar:"2023-05-03", offset:true },

    { solar:"2023-09-01", title: "Quốc Khánh" },
    { solar:"2023-09-02", title: "Quốc Khánh" },
    { solar:"2023-09-03", title: "Quốc Khánh" },
    { solar:"2023-09-04", offset:true },
    
    { solar:"2023-02-11", jp: true },
    { solar:"2023-02-23", jp: true },
    { solar:"2023-03-21", jp: true },
    { solar:"2023-05-04", jp: true },
    { solar:"2023-05-05", jp: true },
    { solar:"2023-07-17", jp: true },
    { solar:"2023-08-11", jp: true },
    { solar:"2023-09-18", jp: true },
    { solar:"2023-09-23", jp: true },
    { solar:"2023-10-09", jp: true },
    { solar:"2023-11-03", jp: true },
    { solar:"2023-11-23", jp: true },


];

Holidays.map((event)=>{
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
