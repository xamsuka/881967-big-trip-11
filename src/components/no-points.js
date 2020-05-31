import AbstractComponent from "./abstract-component";

const createNoPointsTemplate = () => {
  return (`<p class="trip-events__msg" style="color: black;">Click New Event to create your first point</p>`);
};

export default class NoPoints extends AbstractComponent {
  getTemplate() {
    return createNoPointsTemplate();
  }
}
