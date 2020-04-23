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
  const parentElement = newComponent.getElement().parentElement;
  const newChild = newComponent.getElement();
  const oldChild = oldComponent.getElement();
  parentElement.replaceChild(oldChild, newChild);
};

export {createElement, renderComponent, replace};
