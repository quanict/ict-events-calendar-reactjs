import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
//import { faFaceRelieved } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import FullBody from './FullBody';
import "./lunar.scss";

type LunarBodyProps = {
    setDate: any
}

function LunarBody(props:LunarBodyProps){
    const {setDate} = props;

    return(
        <Row className="lunar-calendar mx-0 mt-3 mb-3">
            <Col md="3" className='lunar-info d-flex'>
                <p className="reset-btn">reset</p>
                <div className="p-0 lunar-header">
                    <div className="pre-button d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faChevronLeft} />

                    </div>
                    <div className="head-info">
                        <div className="head-day text-center">1</div>
                        <div className="head-month text-center">September - 2022</div>
                    </div>
                    <div className="next-button d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </Col>
            <Col md="9" className='calendar-wrap'>
                <FullBody headerToolbar={false} setDate={setDate}  />
            </Col>
        </Row>
    );
}


export default LunarBody;