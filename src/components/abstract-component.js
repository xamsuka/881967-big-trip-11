import {createElement} from '../utils/render';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Не возможно создать экземпляр класса "AbstractComponent"`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Абстрактный метод не реализован: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
