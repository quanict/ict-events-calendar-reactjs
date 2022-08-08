import React from 'react';

// import FullCalendar, { EventContentArg} from '@fullcalendar/react' // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import bootstrap5Plugin from '@fullcalendar/bootstrap5';
// import JsCalendar from "js-year-calendar";
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import MonthView from './MonthView';

/**
 * https://codesandbox.io/s/jjmky5047y?file=/src/Year.js:3334-3362
 * @returns 
 */

const YearView = () =>{
    const currentYear = moment().year();
    
    const months = []
    //const firstMonth = today.startOf(today, 'year')
    for (let i = 0; i < 12; i++) {
        months.push(
          <Col className='col-md-4 p-4' key={i + 1} ><MonthView date={moment(`${currentYear}-${i+1}-1`)} className='m-year'  /></Col>
        )
    }

    return(
        <Row >{months.map(month => month)}</Row>
    );
}

export default YearView;