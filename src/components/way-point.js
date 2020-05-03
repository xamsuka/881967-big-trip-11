import AbstractComponent from './abstract-component';
import UtilsComponent from '../utils/util';


const createWayOptionsMarkup = (options) => {
  const keys = Object.keys(options);
  const optionsMarkup = keys.map((key) => {
    return (`<li class="event__offer">
      <span class="event__offer-title">${options[key].name}</span>&plus;&euro;&nbsp;
      <span class="event__offer-price">${options[key].price}</span>
    </li>`);
  }).join(` `);

  return optionsMarkup;
};

const createWayPointTemplate = (wayPoint) => {
  const {type, destantion, date, price, options} = wayPoint;
  const utilsComponent = new UtilsComponent();
  const isExists = !!options;
  const optionsMarkup = isExists ? createWayOptionsMarkup(options) : ``;
  const timeStart = utilsComponent.formateDateTime(date.startDate);
  const timeEnd = utilsComponent.formateDateTime(date.endDate);
  const timeTrip = utilsComponent.getdiffTime(date);

  return (`<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} to ${destantion}</h3>

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
        </div>
      </li>`);
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
