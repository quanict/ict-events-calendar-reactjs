
import React from 'react';

import FullCalendar, { EventContentArg} from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
    getDate,
    getLunarDate,
    setDate
} from '../../redux/date/dateSlice';

import customViewPlugin from '../CalendarPlugin/CustomView';
import LunarDateTime from '../../Libraries/Lunnar/LunarDateTime';
//import events from "../Events";

type FullBodyProps = {
    headerToolbar: any,
}

function FullBody(props:FullBodyProps){
    const currentDate = useAppSelector(getDate);
    const currentLunar = useAppSelector(getLunarDate);
    const dispatch = useAppDispatch();
    const {headerToolbar} = props;

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
        
               
        let lunarDate = new LunarDateTime(info.date);
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

    return <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, bootstrap5Plugin, interactionPlugin, customViewPlugin ]}
        //plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        //themeSystem="bootstrap5"
        //initialView="dayGridMonth"
        //events={events}

        headerToolbar = {headerToolbar===false ? false : {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}

        editable={false}
        selectable={false}
        selectMirror={true}
        dayMaxEvents={true}
        //weekends={this.state.weekendsVisible}
        //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        //select={this.handleDateSelect}
        eventContent={renderEventContent}
        dayCellDidMount={dayCellLunarRender}
        dateClick={dateClickHandler}
        //eventClick={this.handleEventClick}
        //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
    />
}

export default FullBody;