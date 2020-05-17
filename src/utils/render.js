import {InsertPlace} from '../const';

export default class Render {
  createElement(markup) {
    const element = document.createElement(`div`);
    element.innerHTML = markup;
    return element.firstChild;
  }

  render(container, component, place = `beforeend`) {
    switch (place) {
      case InsertPlace.AFTERBEGIN:
        container.prepend(component.getElement());
        break;

      case InsertPlace.BEFOREEND:
        container.append(component.getElement());
        break;
    }
  }

  replace(newComponent, oldComponent) {
    const parentElement = oldComponent.getElement().parentElement;
    const newChild = newComponent.getElement();
    const oldChild = oldComponent.getElement();
    parentElement.replaceChild(newChild, oldChild);
  }

  remove(component) {
    component.getElement().remove();
    component.removeElement();
  }
}
