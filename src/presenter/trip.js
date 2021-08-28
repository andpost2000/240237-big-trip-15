import { render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';
import SortView from '../view/sort';
import EmptyMsgView from '../view/events-msg';
import PointListView from '../view/events-list';
import PointPresenter from './point';
import { SortType } from '../const';
import { sortDay, sortPrice, sortTime } from '../utils/point';

export default class Trip {
  constructor(container){
    this._tripContainer = container;
    this._pointsPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._sortComponent = new SortView();
    this._emptyMsgComponent = new EmptyMsgView();
    this._pointListContainer = new PointListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points =  points.slice();
    this._sourcePoints =  points.slice();

    render(this._tripContainer, this._pointListContainer, RenderPosition.BEFOREEND);

    this._sortPoints(SortType.DAY);
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointsPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcePoints = updateItem(this._points, updatedPoint);
    this._pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._points.sort(sortDay);
        break;
      case SortType.TIME:
        this._points.sort(sortTime);
        break;
      case SortType.PRICE:
        this._points.sort(sortPrice);
        break;
      default:
        this._points = this._sourcePoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListContainer, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointsPresenter.set(point.id, pointPresenter);
  }

  _renderPoints() {
    this._points.forEach((point) => this._renderPoint(point));
  }


  _renderEmptyTripMsg(msg) {
    this._emptyMsgComponent.setMsg(msg);
    render(this._pointListContainer, this._emptyMsgComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip() {
    this._pointsPresenter.forEach((presenter) => presenter.destroy());
    this._pointsPresenter.clear();
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
