import moment from 'moment';
import lunar from '../../Libraries/Lunnar/lunar';
let events : Array<CalendarEvent> = [];

export const Holidays = [
    { solar:"2024-01-01", title: "Tết Dương Lịch" },
    // { solar:"2023-01-02", offset:true },
    { solar:"2024-01-08", jp: true },
    { solar:"2024-02-08", title: "Tết Nguyên Đán" },
    { solar:"2024-02-09", title: "Tết Nguyên Đán" },
    { solar:"2024-02-10", title: "Tết Nguyên Đán" },
    { solar:"2024-02-11", title: "Tết Nguyên Đán" },
    { solar:"2024-02-12", title: "Tết Nguyên Đán" },
    { solar:"2024-02-13", title: "Tết Nguyên Đán" },
    { solar:"2024-02-14", title: "Tết Nguyên Đán" },
    { solar:"2024-02-23", jp: true },

    
    { solar:"2024-04-29", jp: true },
    { solar:"2024-04-30", title: "Ngày Thống nhất đất nước" },
    { solar:"2024-05-01", title: "Ngày Thống nhất đất nước" },
    { solar:"2024-05-03", jp: true },
    { solar:"2024-05-04", jp: true },
    { solar:"2024-05-05", jp: true },
    { solar:"2024-05-06", jp: true },
    
    // { solar:"2023-05-02", offset:true },
    // { solar:"2023-05-03", offset:true },

    { solar:"2024-07-15", jp: true },
    { solar:"2024-08-11", jp: true },
    { solar:"2024-08-12", jp: true },

    { solar:"2024-08-31", title: "Quốc Khánh" },
    { solar:"2024-09-01", title: "Quốc Khánh" },
    { solar:"2024-09-02", title: "Quốc Khánh" },
    { solar:"2024-09-04", title: "Quốc Khánh" },

    // { solar:"2023-09-04", offset:true },
    
    { solar:"2024-11-14", jp: true },
    { solar:"2024-12-03", jp: true },
    { solar:"2024-12-04", jp: true },
    { solar:"2024-12-23", jp: true },
  


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
