import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../redux/hooks';
import { getLunarDate } from '../../redux/date/dateSlice';
import FullBody from './FullBody';
import "./lunar.scss";

function Style2(){
    const date = useAppSelector(getLunarDate);

    return(
        <Row className="lunar-calendar mx-0 mt-3 mb-3">
            <Col md="3" className='lunar-info d-flex'>
                <p className="reset-btn">reset</p>
                <div className="p-0 lunar-header">
                    <Row>
                    <div className="pre-button d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className="head-info d-none">
                        <div className="head-day text-center">{date.moment.format("DD")}</div>
                        <div className="head-month text-center">{date.moment.format("MMMM-YYYY")}</div>
                        <div className="head-day-lunar text-center">{date.format("d-m")}</div>
                    </div>
                    <div className="next-button d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    </Row>
                    <Row className="lunar-date">
                    <Col><p>Ngày</p><span className='d-block'>{date.format("DDDD")}</span></Col>
                    <Col><p>Tháng</p><span className='d-block'>{date.format("MMMM")}</span></Col>
                    <Col><p>Năm</p><span className='d-block'>{date.format("YYYY")}</span></Col>
                </Row>
                </div>
                
            </Col>
            <Col md="9" className='calendar-wrap'>
                <FullBody headerToolbar={false} />
            </Col>
        </Row>
    );
}


export default Style2;