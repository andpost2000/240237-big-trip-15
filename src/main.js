
import { generatePoint } from './mock/point';
import { eventsFilter } from './mock/filter';
import { render, RenderPosition} from './utils/render';
import FiltersView from './view/filters';
import TripInfoView from './view/trip-info';
import TripInfoMainView from './view/trip-info-main';
import TripInfoCostView from './view/trip-info-cost';
import SiteMenuView from './view/menu';
import TripPresenter from './presenter/trip';


const POINT_COUNT = 15;
let POINTS_DATA = [];

const generatePoints = (count) => {
  for (let i = 0; i < count; i++) {
    const point = generatePoint();
    POINTS_DATA.push(point);
  }
};

generatePoints(POINT_COUNT);

if (POINTS_DATA.length) {
  POINTS_DATA = eventsFilter(POINTS_DATA, 'future');
  POINTS_DATA.sort((a, b) => a.time.start - b.time.start);
}

const tripMainElement = document.querySelector('.trip-main');
render(tripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);

const tripInfoElement = document.querySelector('.trip-info');
if (POINTS_DATA.length) {
  render(tripInfoElement, new TripInfoMainView(POINTS_DATA), RenderPosition.BEFOREEND);
}
render(tripInfoElement, new TripInfoCostView(POINTS_DATA), RenderPosition.BEFOREEND);

const tripMainNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
render(tripMainNavigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
render(tripFiltersElement, new FiltersView(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripEventsElement);

tripPresenter.init(POINTS_DATA);
