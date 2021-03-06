import AbstractSmartComponent from './abstract-smart-component';
import flatpickr from "flatpickr";
import moment from 'moment';
import {DESTINATIONS} from '../main';
import {OFFERS} from '../main';
import {PLACES} from '../const';
import {Mode as WayPointControllerMode} from '../controller/point';
import "flatpickr/dist/flatpickr.min.css";

const getDataLists = (destination) => {
  const optionsDataList = DESTINATIONS.map((city) => {
    const isSelected = destination.name === city.name ? `selected` : ``;
    return (`<option ${isSelected} value="${city.name}">${city.name}</option>`);
  }).join(``);

  return optionsDataList;
};

const getOfferName = (offerName) => {
  return offerName.replace(/ /g, `-`);
};

const createOfferMarkup = (offersWayPoint, offer) => {
  const isExist = offersWayPoint.find((offerPoint) => offerPoint.title === offer.title) ? true : false;
  const isChecked = isExist ? `checked` : ``;
  const offerName = getOfferName(offer.title.toLowerCase());
  return (`<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-1" type="checkbox"
    name="event-offer-${offerName}" ${isChecked}>
  <label class="event__offer-label" for="event-offer-${offerName}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </label>
</div>`);
};

export const createOffersMarkup = (offersWayPoint, offersInType) => {
  if (offersInType) {
    const offersMarkup = offersInType.map((offer) => {
      return createOfferMarkup(offersWayPoint, offer);
    }).join(``);

    if (offersMarkup) {
      return (`<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>`);
    }

  } return ``;
};


const createEditFormTripTemplate = (wayPoint, replaceableData = {}) => {
  const {date, price, isFavorite} = wayPoint;
  const {type, destination, offers} = replaceableData;
  const timeStart = moment(date.startDate).format(`YYYY/MM/DD HH:MM`);
  const timeEnd = moment(date.endDate).format(`YYYY/MM/DD HH:MM`);
  const offersMarkup = createOffersMarkup(wayPoint.offers, offers);
  const statusFavoriteMarkup = isFavorite ? `checked` : ``;
  const dataLists = getDataLists(destination);
  const placeholder = PLACES.find((place) => place === type) ? `in` : `to`;
  const baseType = `flight`;
  const isBaseType = type === baseType ? `checked` : ``;

  return (`<form class="event  event--edit" action="#" method="post">
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
                    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${isBaseType}>
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
                ${type} ${placeholder}
              </label>
              <select class="event__input  event__input--destination" id="event-destination-1" name="event-destination" value="${destination.name}">
                ${dataLists}
              </select>
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
              <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}" require>
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>

            <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${statusFavoriteMarkup}>
            <label class="event__favorite-btn" for="event-favorite-1">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </label>

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>

          <section class="event__details">
              ${offersMarkup}
          </section>
        </form>`);
};

export default class EditFormTrip extends AbstractSmartComponent {
  constructor(wayPoint) {
    super();
    this._wayPoint = wayPoint;
    this._mode = WayPointControllerMode.EDIT;
    this._statusForm = false;
    this._eventType = wayPoint.type;
    this._destinationWayPoint = this._wayPoint.destination;
    this._offersWayPoint = OFFERS.find((offer) => offer.type === this._eventType.toLowerCase()).offers;
    this._setSubmitHandler = null;
    this._setDeleteHandler = null;
    this._setButtonFavoriteChangeHandler = null;
    this._setButtonCloseEditClickHandler = null;
    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditFormTripTemplate(this._wayPoint, {
      type: this._eventType,
      destination: this._destinationWayPoint,
      offers: this._offersWayPoint,
    });
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    this.rerender();
  }

  setButtonCloseEditClick(handler) {
    const editWayPointElement = this.getElement();
    const buttonCloseEditElement = editWayPointElement.querySelector(`.event__rollup-btn`);

    buttonCloseEditElement.addEventListener(`click`, handler);

    this._setButtonCloseEditClickHandler = handler;
  }

  setButtonSaveClick(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._setSubmitHandler = handler;
  }

  setButtonDeleteClick(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
    .addEventListener(`click`, handler);

    this._setDeleteHandler = handler;
  }

  setButtonFavoriteChange(handler) {
    this.getElement().querySelector(`.event__favorite-icon`).addEventListener(`click`, handler);

    this._setButtonFavoriteChangeHandler = handler;
  }

  recoveryListeners() {
    this.setButtonSaveClick(this._setSubmitHandler);
    this.setButtonDeleteClick(this._setDeleteHandler);
    this.setButtonCloseEditClick(this._setButtonCloseEditClickHandler);
    this.setButtonFavoriteChange(this._setButtonFavoriteChangeHandler);
    this._subscribeOnEvents();
  }

  getDataEditForm() {
    const form = this.getElement();
    return new FormData(form);
  }

  getEventType() {
    return this._eventType;
  }

  setDisabledEditForm(buttonEventName) {

    const editForm = this.getElement();
    if (!this._statusForm) {
      editForm.querySelectorAll(`form input, form select, form textarea, form button`)
      .forEach((elem) => {
        elem.disabled = true;
      });

      this._statusForm = true;
    } else {
      editForm.querySelectorAll(`form input, form select, form textarea, form button`)
      .forEach((elem) => {
        elem.disabled = false;
      });

      this._statusForm = false;
    }

    const buttonSaveElement = editForm.querySelector(`.event__save-btn`);
    const buttonDeleteElement = editForm.querySelector(`.event__reset-btn`);

    if (buttonEventName) {
      switch (buttonEventName) {
        case `Save`:
          buttonSaveElement.textContent = `Saving...`;
          break;

        case `Saving...`:
          buttonSaveElement.textContent = `Save`;
          break;

        case `Delete`:
          buttonDeleteElement.textContent = `Deleting...`;
          break;

        case `Deleting...`:
          buttonDeleteElement.textContent = `Delete`;
          break;
      }
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`click`, (evt) => {
        const target = evt.target;
        const input = target.htmlFor;
        if (target.nodeName === `LABEL`) {
          this._eventType = target.textContent;
          this._offersWayPoint = OFFERS.find((offer) => offer.type === this._eventType.toLowerCase()).offers;

          this.rerender();

          this.getElement().querySelector(`#${input}`).checked = true;
        }
      });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {

        const indexDestination = evt.target.selectedIndex;

        this._destinationWayPoint = DESTINATIONS[indexDestination];

        this.rerender();
      });

    const eventStartDateElement = this.getElement().querySelector(`input[name="event-start-time"]`);
    const eventEndDateElement = this.getElement().querySelector(`input[name="event-end-time"]`);
    eventStartDateElement.addEventListener(`change`, (evt) => {
      this._flatpickrEndDate = flatpickr(eventEndDateElement, {
        enableTime: true,
        dateFormat: `Y/m/d H:i`,
        minDate: evt.target.value,
      });

      eventEndDateElement.value = evt.target.value;
    });
  }

  _applyFlatpickr() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }
    const eventStartDateElement = this.getElement().querySelector(`input[name="event-start-time"]`);
    const eventEndDateElement = this.getElement().querySelector(`input[name="event-end-time"]`);

    const eventStartDateValue = eventStartDateElement.value;

    this._flatpickrStartDate = flatpickr(eventStartDateElement, {
      enableTime: true,
      dateFormat: `Y/m/d H:i`,
    });
    this._flatpickrEndDate = flatpickr(eventEndDateElement, {
      enableTime: true,
      dateFormat: `Y/m/d H:i`,
      minDate: eventStartDateValue,
    });
  }
}
