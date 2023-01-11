import moment from 'moment';

let domain = "";
switch(window.location.hostname){
  case "quanict.github.io":
    domain = "https://quanict.github.io/ict-events-calendar-reactjs";
    break;
  case 'calander.quanict.com':
    domain = "https://calander.quanict.com";
    break;
  default:
    domain = "";
    break;
}

// declare global {
//   interface String {
//     redirectToRoute() : void;
//     redirectToDayRoute() : void;
//   }
// }

// String.prototype.redirectToRoute = function () {
//   const _self = this;
//   window.location.href = `${domain}/${_self}`;
//   return;
// }

// String.prototype.redirectToDayRoute = function () {
//   const _self = this;
//   window.location.href = `${domain}/date/${_self}`;
//   return;
// }

declare module 'moment' {
  export interface Moment {
    toMonthUri(): string;
  }
}

(moment.fn as any).toMonthUri = function () {
const _self = this as moment.Moment;
return `${domain}/month/${_self.format("YYYY-MM")}`;
}





