import WayPointComponent from '../components/way-point';
import EditFormTripComponent from '../components/edit-form-trip';
import AddNewEventComponent from '../components/add-new-event';
import UtilsComponent from '../utils/util';
import RenderComponent from '../utils/render';
import {InsertPlace} from '../const';

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyWayPoint = {
  id: 2,
  type: `Flight`,
  destantion: ``,
  date: {
    startDate: new Date(),
    endDate: new Date(),
  },
  price: ``,
  options: {},
  info: {},
  isFavorite: false,
};

const utilsComponent = new UtilsComponent();
const renderComponent = new RenderComponent();

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._wayPointComponent = null;
    this._editFormTripComponent = null;
    this._mode = Mode.DEFAULT;
    this._onButtonEditClick = this._onButtonEditClick.bind(this);
    this._onButtonCancelClick = this._onButtonCancelClick.bind(this);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._creatingPoint = null;
    this._buttonAddEvetComponent = null;
  }

  render(wayPoint, mode) {
    debugger;
    const oldEditFormTripComponent = this._editFormTripComponent;
    const oldWayPointComponent = this._wayPointComponent;

    this._mode = mode;
    this._wayPointComponent = new WayPointComponent(wayPoint);
    this._editFormTripComponent = new EditFormTripComponent(wayPoint);

    this._wayPointComponent.setButtonEditClick(() => {
      document.addEventListener(`keydown`, this._onButtonEditClick);
      this._replaceWayPointToEdit();
    });

    this._editFormTripComponent.setButtonSaveClick((evt) => {
      evt.preventDefault();
      const data = this._editFormTripComponent.getDataEditForm();
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
        this._creatingPoint = new AddNewEventComponent(wayPoint);

        const tripEventsElement = document.querySelector(`.trip-sort`);

        document.addEventListener(`keydown`, this._onButtonCancelClick);

        this._creatingPoint.setButtonSaveClick((evt) => {
          evt.preventDefault();
          const data = this._creatingPoint.getDataEditForm();
          this._onDataChange(this, wayPoint, data);
          renderComponent.remove(this._creatingPoint);
        });

        this._creatingPoint.setButtonCancelClick(() => {
          renderComponent.remove(this._creatingPoint);
          this._onDataChange(this, EmptyWayPoint, null);
        });

        renderComponent.render(tripEventsElement, this._creatingPoint, InsertPlace.AFTER);
        break;
    }
  }

  destroy() {
    renderComponent.remove(this._wayPointComponent);
    renderComponent.remove(this._editFormTripComponent);
    document.removeEventListener(`keydown`, this._onButtonEditClick);
  }

  setDefaultView() {
    this._closeFormNewEvent();

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
      renderComponent.remove(this._creatingPoint);
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
