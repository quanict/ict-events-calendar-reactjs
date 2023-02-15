import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import {Events} from '../Components';
import  { toLunar, isMoment} from '../Libraries';

import "./DayView.scss";

function DayView(){
    let {date} = useParams();
    const current = toLunar( date as string) ;
    const monday = current.moment.day(1);
    const dayOfWeek=[0,1,2,3,4,5,6];

    const dayEvents = Events.filter((event)=>{
        if( !event || !event.date ){
            return false;
        }
        if( isMoment(event.date) ){
            return current.moment.diff(event.date, 'days')===0
        } else {
            return current.moment.diff(event.date.moment, 'days')===0
        }
    });
  
    return(
        <Row className="lunar-calendar-size-big" >
            <Col md="12" lg="12" className='text-center fsize-20 f-davida'>
                {current.moment.format("DD")}
            </Col>
            <Col md="4" lg="4" sm="6" xs="6" className='solar-day'>
                <div className='fsize-5'>{current.format("dddd")}</div>
                <div className='fsize-1_5'>{current.moment.format("dddd")}</div>
            </Col>
            <Col md="4" lg="4" sm="6" xs="6" className='solar-month'>
                <div className='fsize-5'>{current.format("MMMM", 'moment')}</div>
                <div className='fsize-1_5'>{current.moment.format("MMMM")}</div>
            </Col>
            <Col md="4" lg="4" sm="6" xs="12" className='solar-year'>
                <div className='fsize-5'>{current.moment.format("YYYY")}</div>
            </Col>
            <Col md="6" lg="8" xs="12" className='solar-date d-xxl-none' >
                <div className='week'>Week {current.moment.week()}</div>
                <Row className='d-xs-none'>
                {dayOfWeek.map(n => (
                    <Col key={n}>
                        <div>{monday.clone().add(n,'days').format("dddd")}</div>
                        <div>
                            {monday.clone().add(n,'days').format("DD")}
                        </div>
                    </Col>
                ))}
                </Row>
                <div>Gio hoang dao {current.can_chi.gio_hoang_dao}</div>
                <div>Menh ngay {current.can_chi.menh_ngay}</div>
                <div>
                    {dayEvents.map((event, i) => ( event.eventName !== "" &&  <p key={i}>{event.eventName}</p> ))}
                </div>
            </Col>
            
            <Col md="6" lg="4" xs="12" className='text-center lunar-date f-davida'>
                <div className='day f-davida'>{current.format("DD")}</div>
                <div>{current.can_chi.format("YYYY")}</div>
                <div>{current.can_chi.format("MM")}</div>
                <div>{current.can_chi.format("MMMM")}</div>
                <div>{current.can_chi.format("DDDD")}</div>
                <div>{current.can_chi.format("HHHH")}</div>
                <div>{current.can_chi.tiet_khi}</div>
            </Col>
        </Row>
    );
}


export default DayView;
