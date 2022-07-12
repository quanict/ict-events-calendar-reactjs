import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../redux/hooks';
import { getLunarDate } from '../../redux/date/dateSlice';
import FullBody from './FullBody';
import "./Style2.scss";

function Style2(){
    const date = useAppSelector(getLunarDate);

    return(
        <Row>
            <Col m="12" className='d-md-flex justify-content-center'>
                <Row className="lunar-calendar-style2 mt-5">
                    <Col md="4" className='lunar-info d-flex'>
                        <p className="reset-btn">reset</p>
                        <div className="p-0 lunar-header">
                            <Row>
                            <div className="pre-button d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                            <div className="head-info ">
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
                    <Col md="8">
                        <div className='calendar-wrap'>
                        <FullBody headerToolbar={false} themePlugin="lunar_style2" />
                        </div>
                        
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}


export default Style2;