import {events as familyEvents} from './Family';
import {events as holidayEvents} from './Holiday';
import {events as gmo2023} from './Runsystem2023';

const events = [...familyEvents, ...holidayEvents, ...gmo2023];
export default events;