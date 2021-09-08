import dayjs from 'dayjs';
import { OFFERS, DESTINATIONS, POINT_TYPE, getDescription, createPictureUrls, TYPE_NAMES } from '../mock/point';
import { getRandomInteger } from '../utils/common';
import SmartView from './smart';

const createTypeItemTemplate = (type, items) => {
  const res = [];
  items.map((item) => {
    const active = item === type ? 'checked' : '';
    res.push(`<div class="event__type-item">
      <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${active}>
      <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${TYPE_NAMES[item]}</label>
    </div>`);
  });
  return res.join('');
};

const createDestionListTemplate = () => {
  const res = [];
  DESTINATIONS.forEach((dest) => {
    res.push(`<option value="${dest}"></option>`);
  });
  return res.join('\n');
};

const createOffersListTemplate = (offers, isOffers) => {
  if (!isOffers) {
    return '';
  }
  const offersList = [];
  offers.forEach((offer) => {
    offersList.push(`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" data-id="${offer.id}" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${offer.isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `);
  });
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersList.join('\n')}
      </div>
    </section>
  `;
};

const createPictureTemplate = (urls) => urls.map((url) => `<img class="event__photo" src="${url}" alt="Event photo">`).join('');

const createEditPointTemplate = (point) => {
  const { type, price, time, destination, description, isOffers, pictures } = point;
  const timeStart = dayjs(time.start);
  const timeEnd = dayjs(time.end);
  const pictureTemplate = createPictureTemplate(pictures);
  const typeItemsTemplate = createTypeItemTemplate(type, POINT_TYPE);
  const destionListTemplate = createDestionListTemplate();
  const offersListTemplate = createOffersListTemplate(point.offers, isOffers);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typeItemsTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destionListTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart.format('YY/MM/DD hh:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd.format('YY/MM/DD hh:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offersListTemplate}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictureTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPoint extends SmartView {
  constructor(point) {
    super();
    this._data = EditPoint.parsePointToData(point);

    this._formChangeHandler = this._formChangeHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);

    this._innerHandlers = {
      'event-type': this._changeTypeHandler,
      'event-destination': this._changeDestinationHandler,
    };

    this.restoreHandlers();
  }

  reset(point) {
    this.updateData(
      EditPoint.parsePointToData(point),
    );
  }

  getTemplate() {
    return createEditPointTemplate(this._data);
  }

  restoreHandlers(hasCloseHandler) {
    this
      .getElement()
      .querySelector('.event--edit')
      .addEventListener('change', this._formChangeHandler);

    if (hasCloseHandler) {
      this.setCloseClickHandler(this._callback.closeClick);
    }
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }

  _formChangeHandler(evt) {
    if (evt.type === 'submit') {
      evt.preventDefault();
      this._callback.formSubmit();
    }

    let needToRestoreHandlers = false;

    const name = evt.target.name;

    if (name in this._innerHandlers) {
      needToRestoreHandlers = this._innerHandlers[name](evt);
    }

    if (evt.target.className.includes('event__offer-checkbox')) {
      this._changeOffersHandler(evt);
      needToRestoreHandlers = true;
    }

    if (needToRestoreHandlers) {
      this.restoreHandlers(true);
    }
  }

  _changeOffersHandler(evt) {
    const isChecked = evt.target.checked;
    const id = evt.target.dataset.id;

    this._data.offers.find((item) => item.id === id).isChecked = isChecked;
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();

    const newType = evt.target.value;

    if (this._data.type !== newType) {

      const newOffers = [];
      const offers = OFFERS[newType];
      if (offers) {
        offers.forEach((offer) => {
          newOffers.push({
            id: offer.toLowerCase().replace(' ', '-'),
            title: offer,
            price: getRandomInteger(1, 25) * 5,
            isChecked: false,
          });
        });
      }

      this.updateData({
        type: newType,
        offers: newOffers,
        isOffers: !!offers,
      });

      return true;
    }

    return false;
  }

  _changeDestinationHandler(evt) {
    const input = evt.target;
    if (input.value === this._data.destination || !DESTINATIONS.includes(input.value)) {
      return false;
    }
    this.updateData({
      destination: input.value,
      description: getDescription(),
      photos: createPictureUrls(),
    });

    return true;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formChangeHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isOffers: !!point.offers,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.isOffers) {
      data.offers = null;
    }

    delete data.isOffers;

    return data;
  }
}
