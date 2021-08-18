import {isEventExpired} from '../utils.js';

export const eventsFilter = (events, filter) => {
  switch (filter) {
    case 'future':
      return events.filter((event) => !isEventExpired(event.time.start));
    case 'archive':
      return events.filter((event) => isEventExpired(event.time.start));
    default:
      return events;
  }
};
