import lunar from './Lunnar/lunar';
import moment from 'moment';
import { Lunar } from './Lunnar/lunar';

const toLunar = function (date: any) {

    if (moment.isMoment(date)) {
        return lunar(date);
    }
    return lunar(moment(date));

}

const isMoment = function (date: any) {
    return moment.isMoment(date)
}

export { lunar, Lunar, moment, toLunar, isMoment };