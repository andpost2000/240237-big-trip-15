import { createAddNewPointTemplate } from './view/add-new-point.js';
import { createEventsListTemplate } from './view/events-list';
import { createEditPointTemplate } from './view/edit-point';
import { createEventTemplate } from './view/event';
import { createMenuTemplate } from './view/menu';
import { createFiltersTemplate } from './view/filters';
import { createSortTemplate } from './view/sort';
import { createTripInfoTemplate } from './view/trip-info';
import { createTripInfoMainTemplate } from './view/trip-info-main';
import { createTripInfoCostTemplate } from './view/trip-info-cost';
import { generatePoint } from './mock/point';

const POINT_COUNT = 15;
const POINTS_DATA = [];

const generatePoints = (count) => {
  for (let i = 0; i < count; i++) {
    const point = generatePoint();
    POINTS_DATA.push(point);
  }
};

generatePoints(POINT_COUNT);

POINTS_DATA.sort((a, b) => a.time.start - b.time.start);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripControlsElement = document.querySelector('.trip-controls');
render(tripControlsElement, createTripInfoTemplate(), 'beforeBegin');

const tripInfoElement = document.querySelector('.trip-info');
render(tripInfoElement, createTripInfoMainTemplate(), 'beforeend');
render(tripInfoElement, createTripInfoCostTemplate(POINTS_DATA), 'beforeend');

const tripMainNavigationElement = tripControlsElement.querySelector('.trip-controls__navigation');
render(tripMainNavigationElement, createMenuTemplate(), 'beforeend');

const tripFiltersElement = tripControlsElement.querySelector('.trip-controls__filters');
render(tripFiltersElement, createFiltersTemplate(), 'beforeend');

const tripEventsElement = document.querySelector('.trip-events');
render(tripEventsElement, createSortTemplate(), 'beforeend');
render(tripEventsElement, createEventsListTemplate(), 'beforeend');

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');
render(tripEventsListElement, createEditPointTemplate(POINTS_DATA[0]), 'beforeend');
for (let i = 1; i < POINTS_DATA.length; i++) {
  render(tripEventsListElement, createEventTemplate(POINTS_DATA[i]), 'beforeend');
}
render(tripEventsListElement, createAddNewPointTemplate(), 'beforeend');
