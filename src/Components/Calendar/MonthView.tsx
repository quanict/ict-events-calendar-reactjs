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
    if( weekStartIndex < 6){
        
        for (let i = 0; i < weekStartIndex; i--) {
            days.push(
                monthStart.clone().add(-i, 'days')
            )
        }
    }

    for (let i = 0; i <= monthEnd.diff(monthStart, 'days'); i++) {
        days.push(
          //<div className='col-7-1 text-center' key={index} >{i+1}</div>
          monthStart.clone().add(i, 'days')
        )
    }

    let weekEndIndex = dayNames.indexOf(monthEnd.format('ddd'));
    if( weekEndIndex < 6){
        
        for (let i = weekEndIndex; i < 6; i++) {
            days.push(
                //<div className='col-7-1 text-center' key={index} >{i}</div>
                monthEnd.clone().add(i, 'days')
            )
        }
    }

    console.log(`============`, {monthStart, monthEnd, weekStartIndex, weekEndIndex});

    return(
        <Row>
            {days.map((date, index) => <div className='col-7-1 text-center' key={index} >{date.format('D-M')}</div>)}
        </Row>
    );
}

export default MonthView;