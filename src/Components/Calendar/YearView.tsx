import React from 'react';
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