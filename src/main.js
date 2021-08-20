
import { generatePoint } from './mock/point';
import { eventsFilter } from './mock/filter';
import { render, RenderPosition} from './utils.js';
import FiltersView from './view/filters';
import TripInfoView from './view/trip-info';
import TripInfoMainView from './view/trip-info-main';
import TripInfoCostView from './view/trip-info-cost';
import SiteMenuView from './view/menu';
import SortView from './view/sort';
import EventsMessage from './view/events-msg';
import EventListView from './view/events-list';
import EditPointView from './view/edit-point';
import PointView from './view/point';
import AddNewPoint from './view/add-new-point.js';


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

const renderPoint = (eventListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const replacePointToForm = () => {
    eventListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    eventListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key ===  'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event__save-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEventList = (eventsContainer, data) => {
  const eventsListElement = new EventListView();
  render(eventsContainer, eventsListElement.getElement(), RenderPosition.BEFOREEND);
  if (data.length) {
    for (let i = 1; i < data.length; i++) {
      renderPoint(eventsListElement.getElement(), data[i]);
    }
    render(eventsListElement.getElement(), new AddNewPoint().getElement(), RenderPosition.BEFOREEND);
  } else {
    const msg = 'Click New Event to create your first point';
    render(eventsListElement.getElement(), new EventsMessage(msg).getElement(), RenderPosition.BEFOREEND);
  }
};

const tripMainElement = document.querySelector('.trip-main');
render(tripMainElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

const tripInfoElement = document.querySelector('.trip-info');
if (POINTS_DATA.length) {
  render(tripInfoElement, new TripInfoMainView(POINTS_DATA).getElement(), RenderPosition.BEFOREEND);
}
render(tripInfoElement, new TripInfoCostView(POINTS_DATA).getElement(), RenderPosition.BEFOREEND);

const tripMainNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
render(tripMainNavigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
render(tripFiltersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');
render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

renderEventList(tripEventsElement, POINTS_DATA);
