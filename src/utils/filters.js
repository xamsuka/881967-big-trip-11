import {FiltersType} from '../const';

export default class Filters {
  getWayPointsByFilter(wayPoints, fiterType) {
    let filterWayPoints = [];
    switch (fiterType.toLowerCase()) {
      case FiltersType.EVERYTHING:
        filterWayPoints = wayPoints;
        break;
      case FiltersType.FUTURE:
        filterWayPoints = this._getWayPointFuture(wayPoints);
        break;
      case FiltersType.PAST:
        filterWayPoints = this._getWayPointPast(wayPoints);
    }

    return filterWayPoints;
  }

  _getWayPointFuture(wayPoints) {
    return wayPoints.filter((wayPoint) => wayPoint.date.startDate > new Date());
  }

  _getWayPointPast(wayPoints) {
    return wayPoints.filter((wayPoint) => wayPoint.date.endDate < new Date());
  }
}
