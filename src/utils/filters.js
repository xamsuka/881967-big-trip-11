import {FiltersType} from '../const';

export default class Filters {
  getWayPointsByFilter(wayPoints, fiterType) {
    let filterWayPoint = [];
    switch (fiterType.toLowerCase()) {
      case FiltersType.EVERYTHING:
        filterWayPoint = wayPoints;
        break;
      case FiltersType.FUTURE:
        filterWayPoint = this._getWayPointFuture(wayPoints);
        break;
      case FiltersType.PAST:
        filterWayPoint = this._getWayPointPast(wayPoints);
    }

    return filterWayPoint;
  }

  _getWayPointFuture(wayPoints) {
    return wayPoints.filter((wayPoint) => wayPoint.date.startDate > new Date());
  }

  _getWayPointPast(wayPoints) {
    return wayPoints.filter((wayPoint) => wayPoint.date.endDate < new Date());
  }
}
