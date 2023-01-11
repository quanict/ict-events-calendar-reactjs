type CalendarEvent = {
    id?: string; 
    type?: string;
    title?: string; 
    eventName: string;
    father?: string; 
    lunar?: any; 
    solar?: any; 
    note?: string; 
    alive?: boolean; 
    date?: any, 

    deathDate?:boolean
    holiday?: boolean,
    offset?:boolean
    jp?: boolean,
    
};