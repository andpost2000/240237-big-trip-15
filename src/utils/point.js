import dayjs from 'dayjs';

export const isEventExpired = (eventDate) => dayjs().isAfter(eventDate);


export const sortDay = (pointA, pointB) =>  dayjs(pointA.time.start).diff(dayjs(pointB.time.start));
export const sortTime = (pointA, pointB) =>  dayjs(pointB.time.start - pointB.time.end).diff(dayjs(pointA.time.start - pointA.time.end));
export const sortPrice = (pointA, pointB) => pointA.price - pointB.price;
