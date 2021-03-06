import AbstractView from './abstract.js';

const createEventsMsgTemplate = (msg) => (
  `<p class="trip-events__msg">${msg}</p>`
);


export default class EventsMsg extends AbstractView {
  constructor() {
    super();
    this._msg = '';
  }

  setMsg(msg) {
    this._msg = msg;
  }

  getTemplate() {
    return createEventsMsgTemplate(this._msg);
  }
}
