import dayjs from 'dayjs';
import { getRandomInteger } from '../utils.js';

const POINT_TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const OFFERS = {
  'Taxi': ['VIP', 'Standart'],
  'Bus': ['Choose seat', 'Luggage'],
  'Train': ['Choose seat', 'Luggage'],
  'Flight': ['Choose seat', 'Luggage', 'Comfort'],
};

const getDescription = () => {
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const randomDescription = description.slice().split('.');
  let result = '';
  randomDescription.sort(() => Math.random() - 0.5).forEach((item, index) => {
    if (index <= getRandomInteger(1, 5) && item !== '') {
      result = result.concat(' ').concat(item).concat('.');
    }
  });
  return result.trim();
};

const generateTime = () => {
  const maxDaysGap = 20;
  const maxHourGap = 24;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hoursGap = getRandomInteger(-maxHourGap, maxHourGap);
  const startDay = dayjs().add(daysGap, 'day');

  const start = dayjs(startDay).add(hoursGap, 'hour');
  const end = dayjs(start).add(30, 'minute').toDate();

  return {
    start,
    end,
  };
};

const createPictureUrls = () => {
  const res = [];
  const count = getRandomInteger(1, 7);
  for (let i = 0; i < count; i++) {
    res.push(`http://picsum.photos/248/152?r=${i + 1}`);
  }
  return res;
};

export const generatePoint = () => {
  const type = POINT_TYPE[getRandomInteger(0, POINT_TYPE.length - 1)];

  return {
    type,
    time: generateTime(),
    cost: getRandomInteger(5, 1000),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: OFFERS[type],
    description: getDescription(),
    pictures: createPictureUrls(),
  };
};
