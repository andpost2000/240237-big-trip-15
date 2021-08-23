import dayjs from 'dayjs';

export const isEventExpired = (eventDate) => dayjs().isAfter(eventDate);
