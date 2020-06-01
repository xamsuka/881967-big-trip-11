import WayPointComponent from '../components/way-point';
import EditFormTripComponent from '../components/edit-form-trip';
import AddNewEventComponent from '../components/add-new-event';
import UtilsComponent from '../utils/util';
import RenderComponent from '../utils/render';
import PointModel from '../models/point';
import {InsertPlace} from '../const';
import {DESTINATIONS} from '../main';

const utilsComponent = new UtilsComponent();
const renderComponent = new RenderComponent();

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyWayPoint = {
  type: `Flight`,
  destination: {
    name: ``,
    description: ``,
    pictures: [],
  },
  date: {
    startDate: new Date(),
    endDate: new Date(),
  },
  price: ``,
  offers: [],
  isFavorite: false,
};

const getOptions = () => {
  const offerInputElements = Array.from(document.querySelectorAll(`.event__offer-selector`));

  let offers = [];
  offerInputElements.forEach((offerSelectorElement) => {
    const isChecked = offerSelectorElement.querySelector(`.event__offer-checkbox`).checked;
    if (isChecked) {
      offers.push({
        title: offerSelectorElement.querySelector(`.event__offer-title`).textContent,
        price: Number(offerSelectorElement.querySelector(`.event__offer-price`).textContent)
      });
    }
  });

  return offers;
};

const parseFormEditData = (formData) => {
  const dataFavorite = formData.get(`event-favorite`) === `on` ? true : false;
  const typeCurrent = document.querySelector(`input[name="event-type"]:checked`);
  return new PointModel({
    "type": typeCurrent.value,
    "destination": {
      name: formData.get(`event-destination`),
      description: DESTINATIONS.find((destination) => destination.name === formData.get(`event-destination`)).description,
      pictures: DESTINATIONS.find((destination) => destination.name === formData.get(`event-destination`)).pictures,
    },
    "date_from": new Date(formData.get(`event-start-time`)),
    "date_to": new Date(formData.get(`event-end-time`)),
    "base_price": Number(formData.get(`event-price`)),
    "offers": getOptions(),
    "is_favorite": dataFavorite
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, destinations) {
    this._container = container;
    this._destinations = destinations;
    this._wayPointComponent = null;
    this._editFormTripComponent = null;
    this._mode = Mode.DEFAULT;
    this._onButtonEditClick = this._onButtonEditClick.bind(this);
    this._onButtonCancelClick = this._onButtonCancelClick.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._creatingWayPoint = null;
  }

  render(wayPoint, mode) {
    const oldEditFormTripComponent = this._editFormTripComponent;
    const oldWayPointComponent = this._wayPointComponent;

    this._mode = mode;

    this._wayPointComponent = new WayPointComponent(wayPoint);
    this._editFormTripComponent = new EditFormTripComponent(wayPoint, this._destinations);

    const editFormType = this._editFormTripComponent.getEventType().toLowerCase();
    const evetTypeCurrentElement = this._editFormTripComponent.getElement().querySelector(`input[value="${editFormType}"]`);
    evetTypeCurrentElement.checked = true;

    this._wayPointComponent.setButtonEditClick(() => {
      document.addEventListener(`keydown`, this._onButtonEditClick);
      this._replaceWayPointToEdit();
    });

    this._editFormTripComponent.setButtonCloseEditClick(() => {
      this._editFormTripComponent.rerender();
      this._replaceEditToWayPoint();
    });

    this._editFormTripComponent.setButtonSaveClick((evt) => {
      evt.preventDefault();
      const formData = this._editFormTripComponent.getDataEditForm();
      const data = parseFormEditData(formData);

      this._onDataChange(this, wayPoint, data);
    });

    this._editFormTripComponent.setButtonDeleteClick(() => {
      this._onDataChange(this, wayPoint, null);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEditFormTripComponent && oldWayPointComponent) {
          renderComponent.replace(this._editFormTripComponent, oldEditFormTripComponent);
          this._replaceEditToWayPoint();

        } else {
          renderComponent.render(this._container, this._wayPointComponent);
        }
        break;
      case Mode.ADDING:
        if (oldEditFormTripComponent && oldWayPointComponent) {
          renderComponent.remove(oldEditFormTripComponent);
          renderComponent.remove(oldWayPointComponent);
        }

        this._onViewChange();

        this._creatingWayPoint = new AddNewEventComponent(wayPoint, this._destinations);

        document.removeEventListener(`keydown`, this._onButtonEditClick);
        document.addEventListener(`keydown`, this._onButtonCancelClick);

        this._creatingWayPoint.setButtonSaveClick((evt) => {
          evt.preventDefault();
          const formData = this._creatingWayPoint.getDataEditForm();
          const data = parseFormEditData(formData);

          this._onDataChange(this, null, data);
          renderComponent.remove(this._creatingWayPoint);
        });

        this._creatingWayPoint.setButtonCancelClick(() => {
          renderComponent.remove(this._creatingWayPoint);
          this._onDataChange(this, EmptyWayPoint, null);
        });

        const sortingElement = document.querySelector(`.trip-sort`);
        const isExistSortElement = sortingElement ? true : false;

        if (isExistSortElement) {
          renderComponent.render(sortingElement, this._creatingWayPoint, InsertPlace.AFTER);
        } else {
          renderComponent.render(this._container, this._creatingWayPoint, InsertPlace.AFTER);
        }

        break;
    }
  }

  destroy() {
    if (this._creatingWayPoint) {
      renderComponent.remove(this._creatingWayPoint);
      document.removeEventListener(`keydown`, this._onButtonCancelClick);
    }
    renderComponent.remove(this._wayPointComponent);
    renderComponent.remove(this._editFormTripComponent);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToWayPoint();
    }
  }

  getModeTrip() {
    return this._mode;
  }

  _replaceWayPointToEdit() {
    this._onViewChange();

    renderComponent.replace(this._editFormTripComponent, this._wayPointComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToWayPoint() {
    document.removeEventListener(`keydown`, this._onButtonEditClick);

    if (document.contains(this._editFormTripComponent.getElement())) {
      renderComponent.replace(this._wayPointComponent, this._editFormTripComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _closeFormNewEvent() {
    if (this._mode === Mode.ADDING) {
      this._onDataChange(this, EmptyWayPoint, null);
    }
  }

  _onButtonEditClick(evt) {
    utilsComponent.isEscapePress(evt, this._replaceEditToWayPoint.bind(this));
  }

  _onButtonCancelClick(evt) {
    utilsComponent.isEscapePress(evt, this._closeFormNewEvent.bind(this));
  }
}
