import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.scss';
import { DataView } from "primereact/dataview";
import events from "./Components/Events";
import { Container } from 'react-bootstrap';
import { LunarBody, Style2 } from './Components/Calendar';
import Header from './Components/Header';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { getView } from './redux/view/viewSlice';

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
    
    const pageView = useAppSelector(getView);

  return (
      <>
          
          <Header  fireHeaderBtn={(type)=>headerBtnClickHandler} />
          <Container >
            {display !== "calendar" && (
                  <DataView
                      value={events.filter((item:any) => new Date(item.start) > new Date())}
                      layout={display}
                      itemTemplate={display === "list" ? renderListItem : renderGridItem}
                      paginator
                      rows={10}
                  />
              )}

              {display === "calendar" && (
                //   <LunarBody />
                  <Style2 />
              )}
          </Container>

      </>
  );
}

export default App;
