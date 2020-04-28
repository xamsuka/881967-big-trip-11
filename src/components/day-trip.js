import AbstractComponent from "./abstract-component";
import UtilsComponent from '../utils/util';

const createDaysTripTemplate = (dateIndex, date) => {
  const utilsComponent = new UtilsComponent();
  const dateRouteTrip = utilsComponent.moment(date).format(`YYYY-MM-DD`);
  const mountDay = utilsComponent.moment(date).format(`MMM D`);
  return (`<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${dateIndex}</span>
    <time class="day__date" datetime="${dateRouteTrip}">${mountDay}</time>
  </div>
  <ul class="trip-events__list">

  </ul>
</li>`);
};

export default class DayTrip extends AbstractComponent {
  constructor(dateIndex, date) {
    super();
    this._dateIndex = dateIndex;
    this._date = date;
  }

  getTemplate() {
    return createDaysTripTemplate(this._dateIndex, this._date);
  }
}
