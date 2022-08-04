import React from 'react';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';

type MonthViewProps = {
    date?: any,
}

function MonthView(props:MonthViewProps){
    let date = props.date;
    if( !date ){
        date = moment('2022-07-01');
    }
    const monthStart = date.clone().startOf('month');
    const monthEnd = date.clone().endOf('month');
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    
    const days = []

    let weekStartIndex = dayNames.indexOf(monthStart.format('ddd'));
    if( weekStartIndex <= 6){
        for (let i = weekStartIndex; i > 0 ; i--) {
            days.push({date:monthStart.clone().add(-i, 'days'), avaiable:false})
        }
    }

    for (let i = 0; i <= monthEnd.diff(monthStart, 'days'); i++) {
        days.push({date:monthStart.clone().add(i, 'days'), avaiable: true})
    }

    let weekEndIndex = dayNames.indexOf(monthEnd.format('ddd'));
    if( weekEndIndex < 6){
        for (let i = weekEndIndex; i < 6; i++) {
            days.push({date:monthEnd.clone().add(i, 'days'), avaiable:false})
        }
    }

    /**
     * add more one week
     */
    if(days.length/7 <6){
        const lastDate = days[days.length-1].date;
        for (let i = 1; i <= 7; i++) {
            days.push( {date:lastDate.clone().add(i, 'days'), avaiable:false} )
        }
    }

    //console.log(`============`, {monthStart, monthEnd, weekStartIndex, weekEndIndex});

    return(
        <Row className='m-full'>
            <div className='col-12'><h4>{monthStart.format("MMMM")}</h4></div>
            {dayNames.map((d, index) => <div className='mv-h' key={index} >{d}</div>)}
            {days.map((date, index) => <div className={`mv-d ${!date.avaiable?'mv-dis':''}`} key={index} ><span className='w-75'>{date.date.format('D-M')}</span></div>)}
        </Row>
    );
}

export default MonthView;