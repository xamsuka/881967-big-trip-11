const createElement = (markup) => {
  const element = document.createElement(`div`);
  element.innerHTML = markup;
  return element.firstChild;
};

export {createElement};
