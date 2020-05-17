import AbstractComponent from "./abstract-component";
import {FiltersType} from '../const';

const createFilterTripTemplate = () => {
  return (`<form class="trip-filters" action="#" method="get">
          <div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
          </div>

          <div class="trip-filters__filter">
            <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
            <label class="trip-filters__filter-label" for="filter-future">Future</label>
          </div>

          <div class="trip-filters__filter">
            <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
            <label class="trip-filters__filter-label" for="filter-past">Past</label>
          </div>

          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>`);
};

export default class Filter extends AbstractComponent {
  constructor() {
    super();
    this._currentFilterType = FiltersType.EVERYTHING;
  }
  getTemplate() {
    return createFilterTripTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement()
      .addEventListener(`click`, (evt) => {
        if (this._currentFilterType === evt.target.textContent) {
          return;
        }

        this._currentFilterType = evt.target.textContent;

        handler(this._currentFilterType);
      });

  }
}
