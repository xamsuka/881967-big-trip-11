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

  disabledButton() {
    const buttonElement = this.getElement();
    if (buttonElement.hasAttribute(`disabled`)) {
      buttonElement.removeAttribute(`disabled`);
    }
    buttonElement.setAttribute(`disabled`, `disabled`);
  }


}
