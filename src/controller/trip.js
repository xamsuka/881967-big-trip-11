import NoPointsComponent from '../components/no-points';
import SortComponent, {SortType} from '../components/sort-trip';
import DaysTirpComponent from '../components/trip-days';
import DayTripComponent from '../components/day-trip';
import UtilsComponent from '../utils/util';
import RenderComponent from '../utils/render';
import PointController, {Mode as WayPointControllerMode, EmptyWayPoint} from './point';

const utilsComponent = new UtilsComponent();

export default class TripController {
  constructor(container, wayPointsModel, buttonAdd) {
    this._wayPointsModel = wayPointsModel;
    this._showedWayPointControllers = [];
    this._dayTripComponents = [];
    this._container = container;
    this._buttonNewEvent = buttonAdd;
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._tripDaysComponent = new DaysTirpComponent();
    this._renderComponent = new RenderComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._wayPointsModel.setFilterChangeHandler(this._onFilterChange);

    this._creatingWayPoint = null;
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
    this._resetSortType();
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
    this._resetSortType();
    this._onViewChange();
  }

  render() {
    const wayPoints = this._wayPointsModel.getWayPoints();
    const isAvailable = Object.keys(wayPoints).length === 0;

    if (isAvailable) {
      this._renderComponent.render(this._container, this._noPointsComponent);
    } else {
      if (this._noPointsComponent) {
        this._renderComponent.remove(this._noPointsComponent);
      }
      const daysTrip = this._gettingDaysTrip(wayPoints);
      let indexDate = 1;


      this._renderComponent.render(this._container, this._sortComponent);
      this._renderComponent.render(this._container, this._tripDaysComponent);
      document.querySelector(`.trip-sort__item--day`).textContent = `DAY`;

      for (const day of daysTrip) {
        const pointInDay = wayPoints.filter((wayPoint) => wayPoint.date.startDate.getDate() === day);
        const dateDayTrip = pointInDay[0].date.startDate;
        const dayTripComponent = new DayTripComponent(indexDate, dateDayTrip);
        const tripEventsListElement = dayTripComponent.getElement().querySelector(`.trip-events__list`);

        this._dayTripComponents.push(dayTripComponent);
        this._renderComponent.render(this._tripDaysComponent.getElement(), dayTripComponent);
        this._showedWayPointControllers = this._showedWayPointControllers.concat(this._renderWayPoints(tripEventsListElement, pointInDay, this._onDataChange, this._onViewChange));

        indexDate++;
      }

      this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    }
  }

  createWayPoint() {
    if (this._creatingPoint) {
      return;
    }

    const daysTripListElement = this._tripDaysComponent.getElement();

    const pointController = new PointController(daysTripListElement, this._onDataChange, this._onViewChange);
    pointController.render(EmptyWayPoint, WayPointControllerMode.ADDING);
    this._showedWayPointControllers = this._showedWayPointControllers.concat(pointController);
  }

  _renderWayPoints(tripEventsListElement, wayPoints, onDataChange, onViewChange) {
    return wayPoints.map((wayPoint) => {
      const tripEventsItemElement = document.createElement(`li`);
      tripEventsItemElement.classList.add(`trip-events__item`);
      tripEventsListElement.append(tripEventsItemElement);
      const pointController = new PointController(tripEventsItemElement, onDataChange, onViewChange);
      pointController.render(wayPoint, WayPointControllerMode.DEFAULT);

      return pointController;
    });
  }

  _renderWayPointsAfterSorting(wayPoints) {
    const dayTripComponent = new DayTripComponent();
    this._dayTripComponents.push(dayTripComponent);
    this._renderComponent.render(this._container, this._tripDaysComponent);
    this._renderComponent.render(this._tripDaysComponent.getElement(), dayTripComponent);

    const tripEventsListElement = dayTripComponent.getElement().querySelector(`.trip-events__list`);
    this._renderWayPoints(tripEventsListElement, wayPoints, this._onDataChange, this._onViewChange);
  }

  _gettingDaysTrip(wayPoints) {
    const daysTripAll = wayPoints.map((wayPoint) => wayPoint.date.startDate.getDate());
    const daysTrip = Array.from(new Set(daysTripAll));

    return daysTrip.sort((a, b) => a - b);
  }

  _sumDate(date) {
    return Object.values(date).reduce((a, b) => a + b, 0);
  }

  _getSortedWayPoints(wayPoints, sortType) {
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

  _removeWayPoints() {
    this._showedWayPointControllers.forEach((WayPointController) => WayPointController.destroy());
    this._showedWayPointControllers = [];
  }

  _removeDayComponents(dayComponents) {
    dayComponents.forEach((dayComponent) => {
      this._renderComponent.remove(dayComponent);
    });
  }

  _resetSortType() {
    const sortType = this._sortComponent.getSortType();
    if (sortType !== SortType.EVENT) {
      this._sortComponent.resetSortType();
    }
  }

  _updateWayPoints() {
    this._removeDayComponents(this._dayTripComponents);
    this._removeWayPoints();
    this._resetSortType();
    this.render();
  }

  _onSortTypeChange(sortType) {
    const sortedWayPoints = this._getSortedWayPoints(this._wayPointsModel.getWayPoints(), sortType);
    this._renderComponent.remove(this._tripDaysComponent);
    if (sortType === `sort-event`) {
      this.render();
    } else {
      this._renderWayPointsAfterSorting(sortedWayPoints);
    }
  }

  _onViewChange() {
    this._showedWayPointControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onFilterChange() {
    this._updateWayPoints();
  }

  _onDataChange(controller, oldPointData, newPointData) {
    const modeTrip = controller.getModeTrip();

    if (modeTrip === WayPointControllerMode.ADDING) {
      this._buttonNewEvent.updateStatusButton();
    }

    if (oldPointData === EmptyWayPoint) {
      this._creatingPoint = null;

      if (newPointData === null) {
        controller.destroy();
        this._updateWayPoints();
      } else {
        this._wayPointsModel.addPoint(newPointData);
        controller.render(newPointData, WayPointControllerMode.DEFAULT);

        this._showedWayPointControllers = [].concat(controller, this._showedWayPointControllers);

        this._updateWayPoints();
      }
    } else if (newPointData === null) {
      this._wayPointsModel.removePoint(oldPointData.id);
      this._updateWayPoints();
    } else {
      const isSuccess = this._wayPointsModel.updatePoint(oldPointData.id, newPointData);

      if (isSuccess) {
        this._updateWayPoints();
      }
    }
  }
}
