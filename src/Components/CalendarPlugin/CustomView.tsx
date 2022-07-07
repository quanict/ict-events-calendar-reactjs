import React from 'react';

import { sliceEvents, createPlugin } from '@fullcalendar/core';

// const CustomView = {
//
//     classNames: [ 'custom-view' ],
//
//     content: function(props:any) {
//         let segs = sliceEvents(props, true); // allDay=true
//         let html =
//             '<div class="view-title">' +
//             props.dateProfile.currentRange.start.toUTCString() +
//             '</div>' +
//             '<div class="view-events">' +
//             segs.length + ' events' +
//             '</div>'
//
//         console.log('this is custom view')
//         return { html: html }
//     }
//
// }
function CustomView(props:any) {
    let segs = sliceEvents(props, true); // allDay=true
    console.log(` using custom view`);

    return (
        <>
            <div className='view-title'>
                {props.dateProfile.currentRange.start.toUTCString()}
            </div>
            <div className='view-events'>
                {segs.length} events
            </div>
        </>
    );
}
export default createPlugin({
    views: {
        custom: CustomView
    }
});