import React from 'react';
import moment from 'moment';
import { Row } from 'react-bootstrap';
import {events} from '../Events/Family';
import lunar from '../../Libraries/Lunnar/lunar';

type MonthViewProps = {
    date?: any,
}

function MonthView(props:MonthViewProps){
    let date = props.date;
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
        for (let i = weekEndIndex; i < 6; i++) {
            days.push({date: lunar(monthEnd.clone().add(i, 'days')), avaiable:false})
        }
    }

    /**
     * add more one week
     */
    if(days.length/7 <6){
        const lastDate = days[days.length-1].date;
        for (let i = 1; i <= 7; i++) {
            days.push( {date: lunar(lastDate.moment.clone().add(i, 'days')), avaiable:false} )
        }
    }


    return(
        <Row className='m-full'>
            <div className='col-12'><h4>{monthStart.format("MMMM")}</h4></div>
            {dayNames.map((d, index) => <div className='mv-h' key={index} >{d}</div>)}
            {days.map((day , index) => {
                
                const dayEvents = events.filter((event)=>{
                    if( !event || !event.date ){
                        return false;
                    }
                    return day.date.moment.diff(event.date.moment, 'days')==0
                });

                if( dayEvents.length > 0 ){
                    dayEvents.map((event)=>{
                        if( !event || !event.date ){
                            return false;
                        }

                        const test1 = day.date.moment.diff(event.date.moment, 'days');
                        const test2 = day.date.moment.format("D-M-YYYY");
                        const test3 = event.date.moment.format("D-M-YYYY");
                        const lunar = event.date;
                    });
                }
                
                return <div className={`mv-d ${!day.avaiable?'mv-dis':''}`} key={index} >
                            <span className='w-75'>
                                {day.date.moment.format('D')}
                                <i className='mv-lunar'>{day.date.format('month-view')}</i>
                                {dayEvents.length > 0 && 
                                <i className='mv-event'></i>
                                }
                            </span>
                        </div>;
            })}
        </Row>
    );
}

export default MonthView;