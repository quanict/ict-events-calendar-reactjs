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
          <Col className='p-4' md={4} sm={12} key={i + 1} ><MonthView date={moment(`${currentYear}-${i+1}-1`)} className='m-year'  /></Col>
        )
    }

    return(
        <Row >
            <Col md={12} className="h1 mt-4 mb-0" >{currentYear}</Col>
            {months.map(month => month)}
        </Row>
    );
}

export default YearView;