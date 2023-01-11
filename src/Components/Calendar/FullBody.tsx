
import React from 'react';

import FullCalendar, { EventContentArg} from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import lunarStyle2Plugin from '../../Libraries/fullcalendar/Style2Plugin';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
    getLunarDate,
    setDate
} from '../../redux/date/dateSlice';

import customViewPlugin from '../CalendarPlugin/CustomView';
import lunar from '../../Libraries/Lunnar/lunar';

//import LunarDateTime from '../../Libraries/Lunnar/LunarDateTime';
//import events from "../Events";

type FullBodyProps = {
    headerToolbar: any,
    themePlugin?: any
}

function FullBody(props:FullBodyProps){
    const currentLunar = useAppSelector(getLunarDate);
    const dispatch = useAppDispatch();
    const {headerToolbar, themePlugin} = props;
    let headerToolbarProps : any = {
        left : 'prev,next today',
        center : 'title',
        right : 'dayGridMonth,timeGridWeek,timeGridDay'
    }

    if( headerToolbar===false  ){
        headerToolbarProps = false;
    }

    function renderEventContent(eventContent: EventContentArg) {
        return (
            <>
                <b>{eventContent.timeText}</b>
                <i>{eventContent.event.title}</i>
            </>
        )
    }

    function dayCellLunarRender(info: {date:Date, el : HTMLElement}){
        const dayFrameElements : HTMLCollection = info.el.getElementsByClassName('fc-daygrid-day-frame');
        const today = new Date();

        if( !dayFrameElements ){
            return;
        }
        const dayFrame : Element | null =  dayFrameElements.item(0);

        if( info.date.toDateString() === today.toDateString() ){
            dayFrame?.classList.add('fc-daygrid-today');
        }

        if( currentLunar.moment.isSame(info.date,'day') ){
            dayFrame?.classList.add('fc-daygrid-today');
        }

        if( info.el.getElementsByClassName('fc-daygrid-day-lunnar').length > 0 ){
            return; // skip add lunar date
        }
        
               
        let lunarDate = lunar(info.date);
        const lunarElm = document.createElement('div');
        lunarElm.className = "fc-daygrid-day-lunnar";
        lunarElm.textContent = lunarDate.format("d/m");
        dayFrame?.append(lunarElm);
    }

    function dateClickHandler(info:{date:Date, dayEl: HTMLElement}){
        dispatch(setDate(info.date.toString()));

        const daySelected = document.querySelectorAll('.fc-daygrid-selected');
        daySelected.forEach(day => {
            day.classList.remove('fc-daygrid-selected');
        });

        const dayFrameElements : Element[] = Array.from(info.dayEl.getElementsByClassName('fc-daygrid-day-frame'));
        dayFrameElements.forEach((dayFrame: Element) => {
            dayFrame?.classList.add('fc-daygrid-selected');
        })
    }

    switch(themePlugin){
        case 'lunar_style2':
            return <FullCalendar 
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, customViewPlugin, lunarStyle2Plugin ]}
                themeSystem="lunar_style2"
                //initialView="dayGridMonth"
                //events={events}
                editable={false}
                selectable={false}
                selectMirror={true}
                dayMaxEvents={true}
                eventContent={renderEventContent}
                dayCellDidMount={dayCellLunarRender}
                dateClick={dateClickHandler}
                headerToolbar={headerToolbarProps}
            />
        case 'bootstrap5':
            return <FullCalendar 
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, customViewPlugin, bootstrap5Plugin ]}
                themeSystem="bootstrap5"
                //initialView="dayGridMonth"
                //events={events}
                editable={false}
                selectable={false}
                selectMirror={true}
                dayMaxEvents={true}
                eventContent={renderEventContent}
                dayCellDidMount={dayCellLunarRender}
                dateClick={dateClickHandler}
                headerToolbar={headerToolbarProps}
            />
        default:
            return <FullCalendar 
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, customViewPlugin ]}
                //initialView="dayGridMonth"
                //events={events}
                editable={false}
                selectable={false}
                selectMirror={true}
                dayMaxEvents={true}
                eventContent={renderEventContent}
                dayCellDidMount={dayCellLunarRender}
                dateClick={dateClickHandler}
                headerToolbar={headerToolbarProps}
            />
    }

}

export default FullBody;