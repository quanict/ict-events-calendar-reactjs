import React from 'react';
import { Col, Row } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../redux/hooks';
import { getLunarDate } from '../../redux/date/dateSlice';
import "./size_big.scss";

function SizeBig(){
    const date = useAppSelector(getLunarDate);
    const monday = date.moment.day(1);
    const dayOfWeek=[0,1,2,3,4,5,6];

    return(
        <Row className="lunar-calendar-size-big" >
            <Col md="12" lg="12" className='text-center fsize-20 f-davida'>
                {date.moment.format("DD")}
            </Col>
            <Col md="4" lg="4" className='solar-day'>
                <div className='fsize-5'>{date.format("dddd")}</div>
                <div className='fsize-1_5'>{date.moment.format("dddd")}</div>
            </Col>
            <Col md="4" lg="4" className='solar-month'>
                <div className='fsize-5'>{date.format("MMMM", 'moment')}</div>
                <div className='fsize-1_5'>{date.moment.format("MMMM")}</div>
            </Col>
            <Col md="4" lg="4" className='solar-year text-right'>
                <div className='fsize-5'>{date.moment.format("YYYY")}</div>
            </Col>
            <Col md="6" lg="8" className='solar-date' >
                <div className='week'>Week {date.moment.week()}</div>
                <Row>
                {dayOfWeek.map(n => (
                    <Col key={n}>
                        <div>{monday.clone().add(n,'days').format("dddd")}</div>
                        <div>
                            {monday.clone().add(n,'days').format("DD")}
                        </div>
                    </Col>
                ))}
                </Row>
                <div>Gio hoang dao {date.can_chi.gio_hoang_dao}</div>
                <div>Menh ngay {date.can_chi.menh_ngay}</div>
            </Col>
            <Col md="6" lg="4" className='text-center lunar-date f-davida'>
                <div className='day f-davida'>{date.format("DD")}</div>
                <div>{date.can_chi.format("YYYY")}</div>
                <div>{date.can_chi.format("MM")}</div>
                <div>{date.can_chi.format("MMMM")}</div>
                <div>{date.can_chi.format("DDDD")}</div>
                <div>{date.can_chi.format("HHHH")}</div>
                <div>{date.can_chi.tiet_khi}</div>
            </Col>

            
        </Row>
    );
}


export default SizeBig;