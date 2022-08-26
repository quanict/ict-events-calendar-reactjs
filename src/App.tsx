import React, { useState, Fragment } from 'react';
//import logo from './logo.svg';
import './App.scss';
import { DataView } from "primereact/dataview";
import { Container } from 'react-bootstrap';
import { LunarBody, DayView, YearView, MonthView } from './Components/Calendar';
import Header from './Components/Header';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getView } from './redux/view/viewSlice';
import moment from 'moment';
import { setDate } from './redux/date/dateSlice';
import {} from './Utils/StringPrototype';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    useParams,
    useLocation
  } from "react-router-dom";

const colors : { [key: string]: any }  = {
    twitter: {
        background: "blue",
        color: "white",
    },
    youtube: {
        background: "red",
        color: "white",
    },
    discord: {
        background: "#5865F2",
        color: "white",
    },
};

function App() {
    const [display, setDisplay] = useState("calendar");


    const renderListItem = (data:any) => {
        console.log(`render list item`, {data})
        let itemType = data.type??'discord';
        return (
            <div className="list-item">
                <div className="image-container">
                    <i
                        className={`pi pi-${itemType} list-category-icon p-p-2 p-shadow-9 pointer`}
                        style={{
                            fontSize: "5em",
                            background: colors[itemType].background,
                            color: colors[itemType].color,
                        }}
                        onClick={() => (window.location = data.url)}
                    />
                </div>
                <div className="list-detail">
                    <h5
                        className="p-mb-2 pointer"
                        onClick={() => (window.location = data.url)}
                    >
                        {data.title}
                    </h5>
                    <span className="list-category">{data.description}</span>
                </div>
                <div className="list-action">
                    <span>{new Date(data.start).toDateString()}</span>
                    <span>{new Date(data.start).toTimeString()}</span>
                    <span>
            <i className="pi pi-tag list-category-icon" />
            <span
                className="list-category"
                style={{
                    color: colors[itemType].background,
                }}
            >
              {itemType}
            </span>
          </span>
                </div>
            </div>
        );
    };

    const renderGridItem = (data:any) => {
        return <div className="p-dataview-grid">Not implemented yet</div>;
    };

  
    const headerBtnClickHandler = (type:string)=>{
        setDisplay(type);
    }
    
  return (
    <>
        <Header  fireHeaderBtn={(type)=>headerBtnClickHandler} />
        <Container >
        {display !== "calendar" && (
                <DataView
                    //value={events.filter((item:any) => new Date(item.start) > new Date())}
                    layout={display}
                    itemTemplate={display === "list" ? renderListItem : renderGridItem}
                    paginator
                    rows={10}
                />
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
