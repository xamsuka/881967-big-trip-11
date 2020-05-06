import NoPointsComponent from '../components/no-points';
import SortComponent, {SortType} from '../components/sort-trip';
import DaysTirpComponent from '../components/trip-days';
import DayTripComponent from '../components/day-trip';
import WayPointComponent from '../components/way-point';
import EditFormTripComponent from '../components/edit-form-trip';
import UtilsComponent from '../utils/util';
import RenderComponent from '../utils/render';

const MAX_RENDER_POINT = 3;

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._renderComponent = new RenderComponent();
    this._tripDaysComponent = null;
  }

  _gettingDaysTrip(wayPoints) {
    const daysTripAll = Array.from(wayPoints.map((wayPoint) => wayPoint.date.startDate.getDate()));
    const daysTrip = Array.from(new Set(daysTripAll));

    return daysTrip.sort();
  }

  _mountedWayPoint(wayPointComponent, editFormTripComponent) {
    const utilsComponent = new UtilsComponent();

    const closeEditFormTrip = () => {
      const buttonCloseEdit = document.querySelector(`.event__save-btn`);
      buttonCloseEdit.click();
      document.removeEventListener(`keydown`, onButtonEditClick);
    };

    const onButtonEditClick = (evt) => {
      utilsComponent.isEscapePress(evt, closeEditFormTrip);
    };

    wayPointComponent.setButtonEditClick(() => {
      document.addEventListener(`keydown`, onButtonEditClick);
      this._renderComponent.replace(editFormTripComponent, wayPointComponent);
    });

    editFormTripComponent.setButtonSaveClick((evt) => {
      evt.preventDefault();
      this._renderComponent.replace(wayPointComponent, editFormTripComponent);
    });
  }

  _gettingWayPoint(wayPoint) {
    const wayPointComponent = new WayPointComponent(wayPoint);
    const editFormTripElement = new EditFormTripComponent(wayPoint);

    this._mountedWayPoint(wayPointComponent, editFormTripElement);

    return wayPointComponent;
  }

  _sortedWayPoints(wayPoints, sortType) {
    let sortedWayPoints = [];

    switch (sortType) {
      case SortType.EVENT:
        sortedWayPoints = wayPoints;
        break;
      case SortType.TIME:
        sortedWayPoints = wayPoints.slice().sort((a, b) => a.date.startDate - b.date.endDate);
        break;
      case SortType.PRICE:
        sortedWayPoints = wayPoints.slice().sort((a, b) => b.price - a.price);
        break;
    }

    return sortedWayPoints;
  }

  render(wayPoints) {
    const isAvailable = Object.keys(wayPoints).length === 0;

    if (isAvailable) {
      this._renderComponent.render(this._container, this._noPointsComponent);
    } else {
      const daysTrip = this._gettingDaysTrip(wayPoints);
      let indexDate = 1;
      this._tripDaysComponent = new DaysTirpComponent();
      this._renderComponent.render(this._container, this._sortComponent);
      this._renderComponent.render(this._container, this._tripDaysComponent);

      for (const day of daysTrip) {
        const pointInDay = wayPoints.filter((wayPoint) => wayPoint.date.startDate.getDate() === day);
        const pointRender = pointInDay.slice().slice(0, MAX_RENDER_POINT);
        const dayTripComponent = new DayTripComponent(indexDate, pointRender[0].date.startDate);
        this._renderComponent.render(this._tripDaysComponent.getElement(), dayTripComponent);

        pointRender.forEach((wayPoint) => {
          const tripEventsListElement = dayTripComponent.getElement().querySelector(`.trip-events__list`);
          this._renderComponent.render(tripEventsListElement, this._gettingWayPoint(wayPoint));
        });

        indexDate++;
      }

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        const sortedWayPoints = this._sortedWayPoints(wayPoints, sortType);
        this._renderComponent.remove(this._tripDaysComponent);

        this.render(sortedWayPoints);
      });

    }
  }
}
