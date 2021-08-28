import dayjs from 'dayjs';
import AbstractView from './abstract.js';

export const createPointTemplate = (point) => {
  const {type, price, time, isFavorite} = point;
  const timeStart = dayjs(time.start);
  const timeEnd = dayjs(time.end);
  const favoriteClass = isFavorite ? ' event__favorite-btn--active' : '';
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${timeStart.format('YYYY-mm-D')}">${timeStart.format('MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type} icon">
      </div>
      <h3 class="event__title">${type} Amsterdam</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${timeStart.format('YYYY-mm-DDThh:mm')}">${timeStart.format('hh:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${timeEnd.format('YYYY-mm-DDThh:mm')}">${timeEnd.format('hh:mm')}</time>
        </p>
        <p class="event__duration">${dayjs(timeEnd - timeStart).format('mm')}M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order ${type}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>
      </ul>
      <button class="event__favorite-btn${favoriteClass}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._openEditClickHandler = this._openEditClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _openEditClickHandler(evt) {
    evt.preventDefault();
    this._callback.openEditClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setOpenEditClickHandler(callback) {
    this._callback.openEditClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._openEditClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
