import React from 'react';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
//import { faFaceRelieved } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
getDate,
  setDate
} from '../../redux/date/dateSlice';
import LunarDateTime from '../../Libraries/Lunnar/LunarDateTime';
import FullBody from './FullBody';
import "./lunar.scss";
import { fromDate, fromLunar } from '../../Libraries/Lunnar';

type LunarBodyProps = {
}

function LunarBody(props:LunarBodyProps){
    const currentDate = useAppSelector(getDate);
    let lunar = fromDate(currentDate);
    //lunar = fromLunar(1,6);
    

    return(
        <Row className="lunar-calendar mx-0 mt-3 mb-3">
            <Col md="3" className='lunar-info d-flex'>
                <p className="reset-btn">reset</p>
                <div className="p-0 lunar-header">
                    <Row>
                    <div className="pre-button d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className="head-info">
                        <div className="head-day text-center">{moment(currentDate).format("DD")}</div>
                        <div className="head-month text-center">{moment(currentDate).format("MMMM-YYYY")}</div>
                        <div className="head-day-lunar text-center">{lunar.format("d-m")}</div>
                    </div>
                    <div className="next-button d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    </Row>
                    <Row className="lunar-date">
                    <Col><p>Giờ</p></Col>
                    <Col><p>Ngày</p><span className='d-block'>{lunar.format("DDDD")}</span></Col>
                    <Col><p>Tháng</p><span className='d-block'>{lunar.format("MMMM")}</span></Col>
                    <Col><p>Năm</p><span className='d-block'>{lunar.format("YYYY")}</span></Col>
                </Row>
                </div>
                
            </Col>
            <Col md="9" className='calendar-wrap'>
                <FullBody headerToolbar={false} />
            </Col>
        </Row>
    );
}


export default LunarBody;