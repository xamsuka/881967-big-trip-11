import AbstractComponent from "./abstract-component";

const createButtonAddTemplate = () => {
  return (`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`);
};

export default class ButtonAdd extends AbstractComponent {
  getTemplate() {
    return createButtonAddTemplate();
  }

  setButtonAddClick(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  updateStatusButton() {
    const buttonElement = this.getElement();
    if (buttonElement.disabled) {
      buttonElement.disabled = false;
    } else {
      buttonElement.disabled = true;
    }
  }
}
