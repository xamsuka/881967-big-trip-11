import NoPointsComponent from '../components/no-points';
import SortComponent, {SortType} from '../components/sort-trip';
import DaysTirpComponent from '../components/trip-days';
import DayTripComponent from '../components/day-trip';
import UtilsComponent from '../utils/util';
import RenderComponent from '../utils/render';
import PointController from './point';

const MAX_RENDER_POINT = 3;
const utilsComponent = new UtilsComponent();

export default class TripController {
  constructor(container) {
    this._wayPoints = [];
    this._showedWayPointController = [];
    this._container = container;
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._tripDaysComponent = new DaysTirpComponent();
    this._renderComponent = new RenderComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _gettingDaysTrip(wayPoints) {
    const daysTripAll = Array.from(wayPoints.map((wayPoint) => wayPoint.date.startDate.getDate()));
    const daysTrip = Array.from(new Set(daysTripAll));

    return daysTrip.sort((a, b) => a - b);
  }

  _renderWayPoints(tripEventsListElement, wayPoints, onDataChange, onViewChange) {
    return wayPoints.map((wayPoint) => {
      const pointController = new PointController(tripEventsListElement, onDataChange, onViewChange);
      pointController.render(wayPoint);

      return pointController;
    });
  }

  _sumDate(date) {
    return Object.values(date).reduce((a, b) => a + b, 0);
  }

  _sortedWayPoints(wayPoints, sortType) {
    let sortedWayPoints = [];

    switch (sortType) {
      case SortType.EVENT:
        sortedWayPoints = wayPoints;
        break;
      case SortType.TIME:
        sortedWayPoints = wayPoints.slice().sort((a, b) => this._sumDate(utilsComponent.getdiffTime(b.date)) - this._sumDate(utilsComponent.getdiffTime(a.date)));
        break;
      case SortType.PRICE:
        sortedWayPoints = wayPoints.slice().sort((a, b) => b.price - a.price);
        break;
    }

    return sortedWayPoints;
  }

  _renderWayPointsAfterSorting(wayPoints) {
    const dayTripComponent = new DayTripComponent(false, false);
    document.querySelector(`.trip-sort__item--day`).textContent = ``;
    this._renderComponent.render(this._container, this._tripDaysComponent);
    this._renderComponent.render(this._tripDaysComponent.getElement(), dayTripComponent);

    const tripEventsListElement = dayTripComponent.getElement().querySelector(`.trip-events__list`);
    this._renderWayPoints(tripEventsListElement, wayPoints, this._onDataChange, this._onViewChange);
  }

  _onViewChange() {
    this._showedWayPointController.forEach((it) => {
      it.setDefaultView();
    });
  }

  render(wayPoints) {
    this._wayPoints = wayPoints;
    const isAvailable = Object.keys(wayPoints).length === 0;

    if (isAvailable) {
      this._renderComponent.render(this._container, this._noPointsComponent);
    } else {
      const daysTrip = this._gettingDaysTrip(wayPoints);
      let indexDate = 1;

      this._renderComponent.render(this._container, this._sortComponent);
      this._renderComponent.render(this._container, this._tripDaysComponent);
      document.querySelector(`.trip-sort__item--day`).textContent = `DAY`;

      for (const day of daysTrip) {
        const pointInDay = wayPoints.filter((wayPoint) => wayPoint.date.startDate.getDate() === day);
        const pointRender = pointInDay.slice().slice(0, MAX_RENDER_POINT);
        const dayTripComponent = new DayTripComponent(indexDate, pointRender[0].date.startDate);
        this._renderComponent.render(this._tripDaysComponent.getElement(), dayTripComponent);

        const tripEventsListElement = dayTripComponent.getElement().querySelector(`.trip-events__list`);
        this._showedWayPointController = this._renderWayPoints(tripEventsListElement, pointRender, this._onDataChange, this._onViewChange);

        indexDate++;
      }

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        const sortedWayPoints = this._sortedWayPoints(wayPoints, sortType);
        this._renderComponent.remove(this._tripDaysComponent);
        if (sortType === `sort-event`) {
          this.render(sortedWayPoints);
        } else {
          this._renderWayPointsAfterSorting(sortedWayPoints);
        }
      });
    }
  }

  _onDataChange(controller, oldPointData, newPointData) {
    const index = this._wayPoints.findIndex((it) => it === oldPointData);

    if (index === -1) {
      return;
    }

    this._wayPoints[index] = newPointData;
    controller.render(this._wayPoints[index]);
  }
}
