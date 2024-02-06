import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import MonthView from './MonthView';
import Footer from '../Components/partials/Footer';
import { moment, lunar, Lunar, toLunar } from '../Libraries';

/**
 * https://codesandbox.io/s/jjmky5047y?file=/src/Year.js:3334-3362
 * @returns 
 */

const YearView = () => {
    const currentYear = moment().year();

    const months = []
    for (let i = 0; i < 12; i++) {
        months.push(
            <Col className='p-4' md={4} sm={12} key={i + 1} ><MonthView date={moment(`${i + 1}/01/${currentYear}`, "MM/DD/YYYY")} className='m-month' /></Col>
        )
    }

    const lunarDate: Lunar.LunarDate = toLunar(moment());

    useEffect(() => {
        const currentMonth = document.querySelector(`[data-m="${moment().format("MM-YYYY")}"]`);
        if (currentMonth) {
            currentMonth.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    });

    return (<>
        <Row >
            <Col md={12} className="h1 mt-4 mb-0" >
                {currentYear}
                <label className='lunar-subtitle text-capitalize'>
                    <span className='year-name'>{lunarDate.can_chi.format("YYYY")}</span>
                </label>
            </Col>
            {months.map(month => month)}
        </Row>
        <Footer />
    </>);
}

export default YearView;