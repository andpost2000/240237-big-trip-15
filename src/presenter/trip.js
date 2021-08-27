import { render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';
import SortView from '../view/sort';
import EmptyMsgView from '../view/events-msg';
import PointListView from '../view/events-list';
import PointPresenter from './point';

export default class Trip {
  constructor(container){
    this._tripContainer = container;
    this._pointPresenter = new Map();

    this._sortComponent = new SortView();
    this._emptyMsgComponent = new EmptyMsgView();
    this._pointListContainer = new PointListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points =  points.slice();

    render(this._tripContainer, this._pointListContainer, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListContainer, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints() {
    this._points.forEach((point) => this._renderPoint(point));
  }


  _renderEmptyTripMsg(msg) {
    this._emptyMsgComponent.setMsg(msg);
    render(this._pointListContainer, this._emptyMsgComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderTrip() {
    if (!this._points.length) {
      const msg = 'Click New Event to create your first point';
      this._renderEmptyTripMsg(msg);
      return;
    }

    this._renderPoints();
    this._renderSort();
  }
}
