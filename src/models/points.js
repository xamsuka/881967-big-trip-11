import FilterUtils from '../utils/filters';
import {FiltersType} from '../const';

export default class Points {
  constructor() {
    this._wayPoints = [];
    this._activeFilter = FiltersType.EVERYTHING;
    this._filterUtils = new FilterUtils();
    this._filterChangeHandlers = [];
  }

  getWayPoints() {
    return this._filterUtils.getWayPointsByFilter(this._wayPoints, this._activeFilter);
  }

  setWayPoints(wayPoints) {
    this._wayPoints = Array.from(wayPoints);
  }

  updatePoint(id, wayPoint) {
    const index = this._wayPoints.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._wayPoints = [].concat(this._wayPoints.slice(0, index), wayPoint, this._wayPoints.slice(index + 1));

    this._callHandlers(this._filterChangeHandlers);

    return true;
  }

  setActiveFilter(filterType) {
    this._activeFilter = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
