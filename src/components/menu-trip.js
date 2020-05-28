import AbstractSmartComponent from "./abstract-smart-component";

export const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`,
};

const createMenuTripTemplate = (activeMenu) => {
  const activeClass = `trip-tabs__btn--active`;
  const isActiveTable = activeMenu === MenuItem.TABLE ? activeClass : ``;
  const isActiveStats = activeMenu === MenuItem.STATISTICS ? activeClass : ``;
  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn ${isActiveTable}" href="#">Table</a>
    <a class="trip-tabs__btn ${isActiveStats}" href="#">Stats</a>
  </nav>`);
};

export default class MenuTrip extends AbstractSmartComponent {
  constructor() {
    super();
    this._currentActiveMenu = MenuItem.TABLE;
    this._setOnChangeHandler = null;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setOnChange(this._setOnChangeHandler);
  }

  getTemplate() {
    return createMenuTripTemplate(this._currentActiveMenu);
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();


      if (this._currentActiveMenu === evt.target.textContent) {
        return;
      }

      this._setOnChangeHandler = handler;
      this._currentActiveMenu = evt.target.textContent;

      this.rerender();

      handler(this._currentActiveMenu);
    });

  }
}
