import AbstractComponent from './abstract-component';
import DaysTirpComponent from './days-trip';
import DayTripComponent from './day-trip';
import WayPointComponent from './way-point';
import EditFormTripComponent from '../components/edit-form-trip';

import {replace} from '../utils/render';

const mountedWayPoin = (wayPointComponent, editFormTripComponent) => {
  const buttonEdit = wayPointComponent.getElement().querySelector(`.event__rollup-btn`);
  const buttonSave = editFormTripComponent.getElement().querySelector(`.event__save-btn`);

  buttonEdit.addEventListener(`click`, () => {
    replace(editFormTripComponent, wayPointComponent);
  });

  buttonSave.addEventListener(`click`, () => {
    replace(wayPointComponent, editFormTripComponent);
  });
};

const renderPoint = (wayPoint) => {
  const wayPointComponent = new WayPointComponent(wayPoint);
  const editFormTripElement = new EditFormTripComponent(wayPoint);

  mountedWayPoin(wayPointComponent, editFormTripElement);

  return wayPointComponent;
};

const createDayRouteMarkup = (dateIndex, wayPoints) => {
  const dateDayWayPoints = wayPoints[0].date.startDate;
  const dayTripElement = new DayTripComponent(dateIndex, dateDayWayPoints).getElement();
  const tripEventsListElement = dayTripElement.querySelector(`.trip-events__list`);

  wayPoints.forEach((wayPoint) => {
    const wayPointElement = renderPoint(wayPoint).getElement();
    tripEventsListElement.appendChild(wayPointElement);
  });

  return dayTripElement;
};

const createRouteTripTemplate = (wayPoints) => {
  const countDaysTrip = Array.from(new Set(Array.from(wayPoints.map((wayPoint) => wayPoint.date.startDate.getDate()))));
  const daysTrip = new DaysTirpComponent().getElement();

  let startIndexDay = 1;

  for (const day of countDaysTrip.slice().sort()) {
    const pointInDay = wayPoints.filter((wayPoint) => wayPoint.date.startDate.getDate() === day);
//    const pointRender = pointInDay.slice().slice(0, MAX_RENDER_POINT);
    const dayRoute = createDayRouteMarkup(startIndexDay, pointInDay);
    daysTrip.appendChild(dayRoute);
    startIndexDay++;
  }

  return daysTrip;
};

export default class RouteTrip extends AbstractComponent {
  constructor(wayPoints) {
    super();
    this._wayPoints = wayPoints;
  }

  getTemplate() {
    return createRouteTripTemplate(this._wayPoints);
  }

  getElement() {
    this._element = this.getTemplate(this._wayPoints);

    return this._element;
  }
}
