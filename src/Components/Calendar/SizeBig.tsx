import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../redux/hooks';
import { getLunarDate } from '../../redux/date/dateSlice';
import FullBody from './FullBody';
import "./Style2.scss";

function SizeBig(){
    const date = useAppSelector(getLunarDate);
    const monday = date.moment.day(1);
    const dayOfWeek=[0,1,2,3,4,5,6];


    return(
        <Row className="lunar-calendar-size-big" >
            <Col md="12" lg="12" className='text-center'>
                {date.moment.format("DD")}
            </Col>
            <Col md="4" lg="4" className='text-center'>
                {date.moment.format("dddd")}
            </Col>
            <Col md="4" lg="4" className='text-center'>
                {date.moment.format("MMMM")}
            </Col>
            <Col md="4" lg="4" className='text-center'>
                {date.moment.format("YYYY")}
            </Col>
            <Col md="6" lg="8" >
                <div>Week {date.moment.week()}</div>
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
                <div>Gio hoang dao {date.gio_hoang_dao}</div>
                <div>Menh ngay {date.day_name}</div>
            </Col>
            <Col md="6" lg="4" className='text-center lunar-date'>
                <div>{date.format("DD")}</div>
                <div>year {date.format("YYYY")}</div>
                <div>month {date.format("MM")}</div>
                <div>month {date.format("MMMM")}</div>
                <div>day {date.format("DDDD")}</div>
            </Col>

            
        </Row>
    );
}


export default SizeBig;