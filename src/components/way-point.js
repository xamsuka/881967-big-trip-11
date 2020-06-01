import AbstractComponent from './abstract-component';
import UtilsComponent from '../utils/util';
import {PLACES} from '../const';

const MAX_VISIBLE_OPTIONS = 3;

const createWayOptionsMarkup = (offers) => {
  const keys = Object.keys(offers);

  const optionsMarkup = keys.map((key, index) => {
    const isVisible = ++index > MAX_VISIBLE_OPTIONS ? `none` : ``;
    return (`<li class="event__offer" style="display: ${isVisible}">
      <span class="event__offer-title">${offers[key].title}</span>&plus;&euro;&nbsp;
      <span class="event__offer-price">${offers[key].price}</span>
    </li>`);
  }).join(` `);

  return optionsMarkup;
};

const createWayPointTemplate = (wayPoint) => {
  const {type, destination, date, price, offers} = wayPoint;
  const utilsComponent = new UtilsComponent();
  const isExists = !!offers;
  const optionsMarkup = isExists ? createWayOptionsMarkup(offers) : ``;
  const timeStart = utilsComponent.formateDateTime(date.startDate);
  const timeEnd = utilsComponent.formateDateTime(date.endDate);
  const timeTrip = utilsComponent.getDiffTime(date);
  const placeholder = PLACES.find((place) => place === type) ? `in` : `to`;

  return (`<div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${placeholder} ${destination.name}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
            </p>
            <p class="event__duration">${timeTrip.days}D ${timeTrip.hours}H ${timeTrip.minutes}M</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${optionsMarkup}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>`);
};

export default class WayPoint extends AbstractComponent {
  constructor(wayPoint) {
    super();
    this._wayPoint = wayPoint;
  }

  getTemplate() {
    return createWayPointTemplate(this._wayPoint);
  }

  setButtonEditClick(handler) {
    const wayPointElement = this.getElement();
    const buttonEditElement = wayPointElement.querySelector(`.event__rollup-btn`);
    buttonEditElement.addEventListener(`click`, handler);
  }
}
