import AbstractComponent from "./abstract-component";

const createDayTripAfterSortTemplate = () => {
  return (`<li class="trip-days__item  day">
    <div class="day__info"></div>
    <ul class="trip-events__list"></ul>
    </li>`);
};

export default class DayTripAfterSort extends AbstractComponent {
  getTemplate() {
    createDayTripAfterSortTemplate();
  }
}
