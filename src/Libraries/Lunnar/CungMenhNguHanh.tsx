
import {Lunar} from "./lunar";
import {CAN, CHI, NGU_HANH, MENH} from "./Constants";
type NguHanh = {
    name: string;
    value: number;
};

const NguHanhFromCan: NguHanh[] = [];

NguHanhFromCan.push({ name: 'Giáp', value: 1 });
NguHanhFromCan.push({ name: 'Ất',   value: 1 });
NguHanhFromCan.push({ name: 'Bính', value: 2 });
NguHanhFromCan.push({ name: 'Đinh', value: 2 });
NguHanhFromCan.push({ name: 'Mậu',  value: 3 });
NguHanhFromCan.push({ name: 'Kỷ',   value: 3 });
NguHanhFromCan.push({ name: 'Canh', value: 4 });
NguHanhFromCan.push({ name: 'Tân',  value: 4 });
NguHanhFromCan.push({ name: 'Nhâm', value: 5 });
NguHanhFromCan.push({ name: 'Quý',  value: 5 });

const NguHanhFromChi: NguHanh[] = [];

NguHanhFromChi.push({ name: 'Tý',   value: 0 });
NguHanhFromChi.push({ name: 'Sửu',  value: 0 });
NguHanhFromChi.push({ name: 'Ngọ',  value: 0 });
NguHanhFromChi.push({ name: 'Mùi',  value: 0 });
NguHanhFromChi.push({ name: 'Dần',  value: 1 });
NguHanhFromChi.push({ name: 'Mão',  value: 1 });
NguHanhFromChi.push({ name: 'Thân', value: 1 });
NguHanhFromChi.push({ name: 'Dậu',  value: 1 });
NguHanhFromChi.push({ name: 'Thìn', value: 2 });
NguHanhFromChi.push({ name: 'Tỵ',   value: 2 });
NguHanhFromChi.push({ name: 'Tuất', value: 2 });
NguHanhFromChi.push({ name: 'Hợi',  value: 2 });

type NguHanhExplain = {
    name: string;
    explain: string;
};

const CungMenhExplain: NguHanhExplain[] = [];

// Sa Trung Kim vàng trong cát, 
// Kim Bạc Kim vàng pha kim khí trắng, 
// Hải Trung Kim vàng dưới biển, 
// Kiếm Phong Kim vàng ở mũi kiếm, 
// Bạch Lạp Kim mang nghĩa là vàng trong nến trắng, 
// Thoa Xuyến Kim mang nghĩa là vàng làm đồ trang sức.
CungMenhExplain.push({ name: 'Kim',     explain: "Phong Kim(Vàng chuôi kiếm)" });
CungMenhExplain.push({ name: 'Hỏa',     explain: "Sơn Đầu Hỏa(Lửa đỉnh núi)" });
//CungMenhExplain.push({ name: 'Hỏa',     explain: "Thiên Thượng Hỏa(Lửa trên trời)" });
CungMenhExplain.push({ name: 'Thủy',    explain: "Giản Hạ Thủy(Nước dưới sông)" });
CungMenhExplain.push({ name: 'Thổ',    explain: "Thành Đầu Thổ(Đất đầu thành)" });
//CungMenhExplain.push({ name: 'Thổ',    explain: "Lộ Bàng Thổ(Đất ven đường)" });
//CungMenhExplain.push({ name: 'Thổ',    explain: "Bạch Lạp Kim(Vàng sáp ong)" });
CungMenhExplain.push({ name: 'Mộc',    explain: "Dương Liễu Mộc(Gỗ dương liễu)" });
//CungMenhExplain.push({ name: 'Mộc',    explain: "Thạch Lựu Mộc(Gỗ thạch lựu)" });
//CungMenhExplain.push({ name: 'Thủy',    explain: "Tuyền Trung Thủy(Nước giữa khe)" });

class CungMenhNguHanhNgay {
    protected lunar;
    constructor(lunar :Lunar.LunarData ) {
        this.lunar = lunar;
    }

    get menh_ngay(){
        const thienCan:string = CAN[(this.lunar.jd + 9) % 10];
        const nguHanhFromCan:number|undefined = NguHanhFromCan.find((n)=>n.name===thienCan)?.value ?? 0;
        
        const diaChi: string = CHI[(this.lunar.jd+1)%12];
        const nguHanhFromChi:number|undefined = NguHanhFromChi.find((n)=>n.name===diaChi)?.value ?? 0;

        let nguHanhIndex = 0;
        nguHanhIndex = (nguHanhFromCan + nguHanhFromChi + 0)%5-1;
        const menh = NGU_HANH[nguHanhIndex];

        const menh_detail = MENH.find((n)=>n.name===`${thienCan} ${diaChi}`)?.value ?? 'empty';
        //console.log(`==== debug`, {thienCan,diaChi, nguHanhFromCan, nguHanhFromChi, nguHanhIndex, menh, menh_detail})
        return menh_detail;
        
    }
}

const cung_menh_ngu_hanh_ngay = function(lunnar: Lunar.LunarData ){
    return new CungMenhNguHanhNgay(lunnar);
}

export default cung_menh_ngu_hanh_ngay;