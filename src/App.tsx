import React, { Fragment } from 'react';
import './App.scss';
import { Container } from 'react-bootstrap';
import { DayView, YearView, MonthView } from './Components/Calendar';
import Header from './Components/Header';
import {} from './Utils/StringPrototype';

import {
    Route,
    Routes
  } from "react-router-dom";

function App() {
  return (
    <>
        <Header  />
        <Container >
          <Routes>
              <Route path="/" element={<YearView />} />
              <Route path="/year" element={<YearView />} />
              <Route path="/month" element={<MonthView />} />
              <Route path="/month/:month" element={<MonthView />} />
              <Route path="/date/" element={<DayView />} />
              <Route path="/date/:date" element={<DayView />} />
          </Routes>
        </Container>
        
    </>
  );
}

export default App;
