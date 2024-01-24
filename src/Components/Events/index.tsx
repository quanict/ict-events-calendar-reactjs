import {events as familyEvents} from './Family';
import {events as holidayEvents} from './Holiday';
import {events as gmo2023} from './Runsystem2023';
import {events as gmo2024} from './Runsystem2024';

const events = [...familyEvents, ...holidayEvents, ...gmo2023, ...gmo2024];
export default events;