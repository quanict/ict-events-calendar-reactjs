
import React from 'react';

import FullCalendar, { EventContentArg} from '@fullcalendar/react' // must go before plugins

import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import events from "../Events";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import customViewPlugin from '../CalendarPlugin/CustomView';

type FullBodyProps = {
    headerToolbar: any,
}

function FullBody(props:FullBodyProps){

    const {headerToolbar} = props;

    function renderEventContent(eventContent: EventContentArg) {
        //console.log(`============ renderEventContent`, {eventContent})
        return (
            <>
                <b>{eventContent.timeText}</b>
                <i>{eventContent.event.title}</i>
            </>
        )
    }

    function dayCellLunarRender(info:any){
        const htmlElement = info.el;
        const date = info.date;
        //let element = "<div style='position: absolute; left: 4px; top: 4px;'><a href='https://www.w3schools.com/'>TEST-"+info.dayNumberText+"</a></div>";
        //$('#fc-day-span-'+info.date.getDayOfYear()).parent().parent().prepend(element);
        console.log(`===== dd daycell render`, {info, htmlElement, date})
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

        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        //weekends={this.state.weekendsVisible}
        //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        //select={this.handleDateSelect}
        eventContent={renderEventContent}
        dayCellDidMount={dayCellLunarRender}
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