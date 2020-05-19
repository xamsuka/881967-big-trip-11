import AbstractComponent from './abstract-component';
import {moment} from '../utils/util';

const createDaysTripTemplate = (dateIndex = ``, date = ``) => {
  const dayContainer = dateIndex ? `<span class="day__counter">${dateIndex}</span>` : ``;
  const dayDate = date ? `<time class="day__date" datetime="${moment(date).format(`YYYY-MM-DD`)}">${moment(date).format(`MMM D`)}</time>` : ``;
  return (`<li class="trip-days__item  day">
  <div class="day__info">
    ${dayContainer}
    ${dayDate}
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
