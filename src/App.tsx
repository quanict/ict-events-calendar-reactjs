import React, { Fragment } from 'react';
import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import {} from './Utils/StringPrototype';
import { DayView, YearView, MonthView } from './pages';
import {Header} from './Components';
import './App.scss';


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
