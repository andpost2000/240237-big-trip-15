import { createElement } from '../utils';

const createTripInfoCostTemplate = (data) => {
  const total = data.reduce((acc, item) => acc + item.cost, 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>`;
};


export default class TripInfoCost {
  constructor(data) {
    this._element = null;
    this._data = data;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
