import moment from 'moment';
import lunar from '../../Libraries/Lunnar/lunar';

const Family = [
    { id:"01", title: "Nguyễn Đăng Điều" },
    { id:"02", title: "Nguyễn Công Hinh (tức Hương)", father: "01" },
    { id:"03", title: "Nguyễn Xuân Yên", father: "01" },

    { id:"04", title: "Nguyễn Tú Trạc", lunar: "YEAR-09-22", father: "02" },
    { id:"05", title: "Nguyễn Sử Thì", lunar: "YEAR-04-12", father: "04" },
    { id:"06", title: "Nguyễn Hai Thế", father: "04" },
    { id:"07", title: "Nguyễn Ba Hồng", father: "04" },
    { id:"08", title: "Nguyễn Tư Tiến", father: "04" },
    { id:"09", title: "Nguyễn Năm Lập", father: "04" },

    { id:"10", title: "Nguyễn Đội Thưởng", lunar: ("YEAR-04-28"), father: "05" },
    { id:"11", title: "Nguyễn Tri Ca", lunar: ("YEAR-05-25"), father: "05" },
    { id:"12", title: "Nguyễn Xuân Cách (ông Mãnh)", lunar: ("YEAR-01-17"), father: "05" },

    { id:"13", title: "Nguyễn Văn Tước", lunar: ("YEAR-11-13"), father: "10" },
    { id:"14", title: "Nguyễn Văn Vi", father: "10" },
    { id:"15", title: "Nguyễn Văn Ái", father: "10" },

    { id:"16", title: "Nguyễn Văn Rạng (ông mãnh)", father: "10" },
    { id:"17", title: "Nguyễn Văn Tích", father: "10", note: "4 con gái" },
    { id:"18", title: "Nguyễn Văn Sướng", father: "10", lunar: ("YEAR-10-14") },
    { id:"19", title: "Nguyễn Văn Đáp", father: "10", note:"1 gái" },

    { id:"20", title: "Nguyễn Văn Quý", father: "10", lunar: ("YEAR-07-13")},
    { id:"21", title: "Nguyễn Văn Quán", father: "10", alive: true },
    { id:"22", title: "Nguyễn Văn Quản", father: "10", alive: true },
    { id:"23", title: "Nguyễn Văn Thiệu", father: "10", note:"3 gái" },
    { id:"24", title: "Nguyễn Văn Thuật", father: "10", alive: true },

    { id:"25", title: "Nguyễn Tiến Dũng", father: "10", alive: true },
    { id:"26", title: "Nguyễn Xuân Toàn", father: "10", alive: true },
    { id:"27", title: "Nguyễn Xuân Trường", father: "10", alive: false },
    { id:"28", title: "Nguyễn Văn Đỏ", father: "10", alive: false },
];

export let events = Family.map((human)=>{
    const row: { id: string; title: string; father?: string; lunar?: any; note?: string; alive?: boolean; date?: any } = { ...human };
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if( !human.lunar ){
        return false;
    }
    row.lunar = human.lunar.replace("YEAR", year).replace("MONTH", month);
    const date = moment(row.lunar);
    row.date = lunar(parseInt(date.format('D')), parseInt(date.format('M')));
    return row;
});

events = events.filter(d=>d!==false);

