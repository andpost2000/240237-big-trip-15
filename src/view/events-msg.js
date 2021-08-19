import { createElement } from '../utils';

const createEventsMsgTemplate = (msg) => (
  `<p class="trip-events__msg">${msg}</p>`
);


export default class EventsMsg {
  constructor(msg) {
    this._element = null;
    this._msg = msg;
  }

  getTemplate() {
    return createEventsMsgTemplate(this._msg);
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
