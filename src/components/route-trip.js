import AbstractComponent from './abstract-component';
import UtilsComponent from '../utils/util';
import DaysTirpComponent from './days-trip';
import DayTripComponent from './day-trip';
import WayPointComponent from './way-point';
import EditFormTripComponent from '../components/edit-form-trip';
import {replace} from '../utils/render';
const MAX_RENDER_POINT = 3;
const utilsComponet = new UtilsComponent();

const gettingDaysTrip = (wayPoints) => {
  const daysTripAll = Array.from(wayPoints.map((wayPoint) => wayPoint.date.startDate.getDate()));
  const daysTrip = Array.from(new Set(daysTripAll));
  return daysTrip;
};

const closeEditFormTrip = () => {
  const buttonCloseEdit = document.querySelector(`.event__save-btn`);
  buttonCloseEdit.click();
  document.removeEventListener(`keydown`, onButtonEditClick);
};

const onButtonEditClick = (evt) => {
  utilsComponet.isEscapePress(evt, closeEditFormTrip);
};

const mountedWayPoint = (wayPointComponent, editFormTripComponent) => {
  wayPointComponent.setButtonEditClick(() => {
    document.addEventListener(`keydown`, onButtonEditClick);
    replace(editFormTripComponent, wayPointComponent);
  });

  editFormTripComponent.setButtonSaveClick((evt) => {
    evt.preventDefault();
    replace(wayPointComponent, editFormTripComponent);
  });
};

const gettingWayPointComponent = (wayPoint) => {
  const wayPointComponent = new WayPointComponent(wayPoint);
  const editFormTripElement = new EditFormTripComponent(wayPoint);

  mountedWayPoint(wayPointComponent, editFormTripElement);

  return wayPointComponent;
};

const createDayRouteElement = (dateIndex, wayPoints) => {
  const dateDayWayPoints = wayPoints[0].date.startDate;
  const dayTripElement = new DayTripComponent(dateIndex, dateDayWayPoints).getElement();
  const tripEventsListElement = dayTripElement.querySelector(`.trip-events__list`);

  wayPoints.forEach((wayPoint) => {
    const wayPointElement = gettingWayPointComponent(wayPoint).getElement();
    tripEventsListElement.appendChild(wayPointElement);
  });

  return dayTripElement;
};

const createRouteTripElement = (wayPoints) => {
  const daysTrip = gettingDaysTrip(wayPoints);
  const daysTripElement = new DaysTirpComponent().getElement();
  let startIndexDay = 1;

  for (const day of daysTrip.slice().sort()) {
    const pointInDay = wayPoints.filter((wayPoint) => wayPoint.date.startDate.getDate() === day);
    const pointRender = pointInDay.slice().slice(0, MAX_RENDER_POINT);
    const dayRoute = createDayRouteElement(startIndexDay, pointRender);
    daysTripElement.appendChild(dayRoute);
    startIndexDay++;
  }

  return daysTripElement;
};

export default class RouteTrip extends AbstractComponent {
  constructor(wayPoints) {
    super();
    this._wayPoints = wayPoints;
  }

  getElement() {
    if (!this._element) {
      this._element = createRouteTripElement(this._wayPoints);
    }

    return this._element;
  }
}
