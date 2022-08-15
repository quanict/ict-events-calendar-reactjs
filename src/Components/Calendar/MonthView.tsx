import React from 'react';
import moment from 'moment';
import { Row } from 'react-bootstrap';
import {events} from '../Events/Family';
import lunar from '../../Libraries/Lunnar/lunar';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";

type MonthViewProps = {
    date?: any,
    className?:string,
    month?:string
}

function MonthView(props:MonthViewProps){
    let date = props.date;
    let monthViewClass = props.className ?? 'm-full';
    let {month} = useParams();
    if( month ){
        date = moment(`${month}-01`);
    }
    
    if( !date ){
        date = moment('2022-08-01');
    }
    const monthStart = date.clone().startOf('month');
    const monthEnd = date.clone().endOf('month');
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    const days = []

    let weekStartIndex = dayNames.indexOf(monthStart.format('ddd'));
    if( weekStartIndex <= 6){
        for (let i = weekStartIndex; i > 0 ; i--) {
            days.push({date: lunar(monthStart.clone().add(-i, 'days')), avaiable:false})
        }
    }

    for (let i = 0; i <= monthEnd.diff(monthStart, 'days'); i++) {
        days.push({date: lunar(monthStart.clone().add(i, 'days')), avaiable: true})
    }

    let weekEndIndex = dayNames.indexOf(monthEnd.format('ddd'));

    if( weekEndIndex < 6){
      
        for (let i = 1; i < 7-weekEndIndex; i++) {
            days.push({date: lunar(monthEnd.clone().add(i, 'days')), avaiable:false})
        }
    }
    /**
     * add more one week
     */
    if(days.length/7 <6 ){
        const lastDate = days[days.length-1].date;
        for (let i = 1; i <= 7; i++) {
            days.push( {date: lunar(lastDate.moment.clone().add(i, 'days')), avaiable:false} )
        }
    }
    
    return(
        <Row className={monthViewClass} >
            <div className='col-12'>
            <Link to={`/month/${monthStart.format("YYYY-MM")}`} className="h4">{monthStart.format("MMMM")}</Link>
                {/* <h4>{monthStart.format("MMMM")}</h4> */}
            </div>
            {dayNames.map((d, index) => <div className='mv-h' key={index} >{d}</div>)}
            {days.map((day , index) => {
                
                const dayEvents = events.filter((event)=>{
                    if( !event || !event.date ){
                        return false;
                    }
                    return day.date.moment.diff(event.date.moment, 'days')===0
                });

                if( dayEvents.length > 0 ){
                    dayEvents.map((event)=>{
                        if( !event || !event.date ){
                            return false;
                        }
                        return true;
                    });
                }
                const className = ['mv-d'];
                if( !day.avaiable ){
                    className.push('mv-dis');
                }
                if( ['Su', 'Sa'].indexOf(day.date.moment.format('dd')) > -1 ){
                    className.push('mv-weekend');
                }

                if( day.date.moment.isSame(moment(), 'day')){
                    className.push('mv-today');
                }
                return <div className={className.join(' ')} key={index} >
                            <span className='w-75'>
                                {day.date.moment.format('D')}
                                <i className='mv-lunar'>{index===0? day.date.format('D/M') : day.date.format('month-view')}</i>
                                {dayEvents.length > 0 && day.avaiable && <i className='mv-event'></i>}
                            </span>
                        </div>;
            })}
        </Row>
    );
}

export default MonthView;