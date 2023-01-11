import React, { useState, Fragment } from 'react';
//import logo from './logo.svg';
import './App.scss';
import { Container } from 'react-bootstrap';
import { DayView, YearView, MonthView } from './Components/Calendar';
import Header from './Components/Header';
import {} from './Utils/StringPrototype';

import {
    Route,
    Routes
  } from "react-router-dom";

// const colors : { [key: string]: any }  = {
//     twitter: {
//         background: "blue",
//         color: "white",
//     },
//     youtube: {
//         background: "red",
//         color: "white",
//     },
//     discord: {
//         background: "#5865F2",
//         color: "white",
//     },
// };

function App() {
    const [display, setDisplay] = useState("calendar");

    const headerBtnClickHandler = (type:string)=>{
        setDisplay(type);
    }
    
  return (
    <>
        <Header  fireHeaderBtn={(type)=>headerBtnClickHandler} />
        <Container >
        {display !== "calendar" && (
                <div />
            )}

        <Routes>
            <Route path="/" element={<YearView />} />
            <Route path="/year" element={<YearView />} />
            <Route path="/month" element={<MonthView />} />
            <Route path="/month/:month" element={<MonthView />} />
            <Route path="/date/" element={<DayView />} />
            <Route path="/date/:date" element={<DayView />} />
            {/* } />
            
            <Route path="/day" children={<DataView />} /> */}
        </Routes>
        </Container>
    </>
  );
}

export default App;
