import WayPointComponent from '../components/way-point';
import EditFormTripComponent from '../components/edit-form-trip';
import UtilsComponent from '../utils/util';
import RenderComponent from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
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
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  render(wayPoint) {
    const oldEditFormTripComponent = this._editFormTripComponent;

    this._wayPointComponent = new WayPointComponent(wayPoint);
    this._editFormTripComponent = new EditFormTripComponent(wayPoint);

    this._wayPointComponent.setButtonEditClick(() => {
      document.addEventListener(`keydown`, this._onButtonEditClick);
      this._replaceWayPointToEdit();
    });

    this._editFormTripComponent.setButtonSaveClick((evt) => {
      evt.preventDefault();
      this._replaceEditToWayPoint();
    });

    this._editFormTripComponent.setButtonFavoriteChange(() => {
      this._onDataChange(this, wayPoint, Object.assign({}, wayPoint, {
        isFavorite: !wayPoint.isFavorite,
      }));
    });

    if (oldEditFormTripComponent) {
      renderComponent.replace(this._editFormTripComponent, oldEditFormTripComponent);
    } else {
      renderComponent.render(this._container, this._wayPointComponent);
    }
  }


  destroy() {
    renderComponent.remove(this._wayPointComponent);
    renderComponent.remove(this._editFormTripComponent);
    document.removeEventListener(`keydown`, this._onButtonEditClick);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToWayPoint();
    }
  }

  _replaceWayPointToEdit() {
    this._onViewChange();
    renderComponent.replace(this._editFormTripComponent, this._wayPointComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToWayPoint() {
    document.removeEventListener(`keydown`, this._onButtonEditClick);
    renderComponent.replace(this._wayPointComponent, this._editFormTripComponent);
    this._mode = Mode.DEFAULT;
  }

  _onButtonEditClick(evt) {
    utilsComponent.isEscapePress(evt, this._replaceEditToWayPoint.bind(this));
  }
}
