const InsertPlace = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (markup) => {
  const element = document.createElement(`div`);
  element.innerHTML = markup;
  return element.firstChild;
};

const renderComponent = (container, component, place = `beforeend`) => {
  switch (place) {
    case InsertPlace.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case InsertPlace.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newChild = newComponent.getElement();
  const oldChild = oldComponent.getElement();
  parentElement.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export default class Render {
  constructor() {
    this.InsertPlace = {
      AFTERBEGIN: `afterbegin`,
      BEFOREEND: `beforeend`
    };
  }

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

export {createElement, renderComponent, replace, remove};
