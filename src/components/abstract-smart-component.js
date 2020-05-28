import AbstractComponent from "./abstract-component";

const HIDE_CLASS = `visually-hidden`;

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDE_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDE_CLASS);
    }
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
