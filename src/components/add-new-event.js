import EditFormTripComponent from './edit-form-trip';
import {moment} from '../utils/util';
import "flatpickr/dist/flatpickr.min.css";

const getDataList = (cityList) => {
  const optionsDataList = cityList.map((city) => {
    return (`<option value="${city}"></option>`);
  });
  return (`<datalist id="destination-list-1">
             ${optionsDataList};
            </datalist>`);
};

const getStatusCheck = (option) => {
  return option ? `checked` : ``;
};

const createOptionsMarkup = (options) => {
  const statusCheckLaggage = getStatusCheck(options[`luggage`]);
  const statusCheckComfort = getStatusCheck(options[`comfort`]);
  const statusCheckMeal = getStatusCheck(options[`meal`]);
  const statusCheckSeats = getStatusCheck(options[`seats`]);
  const statusCheckisTrain = getStatusCheck(options[`train`]);

  return (`<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox"
    name="event-offer-luggage" ${statusCheckLaggage}>
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">Add luggage</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">30</span>
  </label>
</div>

<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox"
    name="event-offer-comfort" ${statusCheckComfort}>
  <label class="event__offer-label" for="event-offer-comfort-1">
    <span class="event__offer-title">Switch to comfort class</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">100</span>
  </label>
</div>

<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal" ${statusCheckMeal}>
  <label class="event__offer-label" for="event-offer-meal-1">
    <span class="event__offer-title">Add meal</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">15</span>
  </label>
</div>

<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox"
    name="event-offer-seats" ${statusCheckSeats}>
  <label class="event__offer-label" for="event-offer-seats-1">
    <span class="event__offer-title">Choose seats</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">5</span>
  </label>
</div>

<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox"
    name="event-offer-train" ${statusCheckisTrain}>
  <label class="event__offer-label" for="event-offer-train-1">
    <span class="event__offer-title">Travel by train</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">40</span>
  </label>
</div>`);
};

const createDetailsMarkup = (wayPoint) => {
  if (wayPoint.info.photos && wayPoint.info.description) {
    const photoElements = wayPoint.info.photos.map((photo) => (`<img class="event__photo" src="${photo}" alt="Event photo">`)).join(` `);
    return (`<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${wayPoint.info.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photoElements};
      </div>
    </div>
  </section>`);
  } else {
    return ``;
  }

};

const createAddNewEventFormTemplate = (wayPoint, replaceableData = {}) => {
  const {destantion, date, price, options} = wayPoint;
  const {type} = replaceableData;
  const timeStart = moment(date.startDate).format(`YYYY/DD/MM HH:MM`);
  const timeEnd = moment(date.endDate).format(`YYYY/DD/MM HH:MM`);
  const optionsMarkup = createOptionsMarkup(options);
  const infoMarkup = createDetailsMarkup(wayPoint);
  const dataList = getDataList([`Omsk`, `Moscow`, `Tomsk`]);

  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>

                  <div class="event__type-item">
                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                    <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>
                </fieldset>

                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>

                  <div class="event__type-item">
                    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>

                  <div class="event__type-item">
                    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${type} to
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destantion}" list="destination-list-1">
                ${dataList}
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>
          </header>

          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">
               ${optionsMarkup}
              </div>
            </section>
            ${infoMarkup}
          </section>
        </form>`);
};

export default class AddNewEvent extends EditFormTripComponent {
  getTemplate() {
    return createAddNewEventFormTemplate(this._wayPoint, {
      type: this._eventType,
    });
  }

  setButtonSaveClick(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._setSubmitHandler = handler;
  }

  setButtonCancelClick(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
    .addEventListener(`click`, handler);

    this._setCancelHandler = handler;
  }
}
