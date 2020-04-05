const MAX_RENDER_POINT = 3;
const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const renderTemplateContainer = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

import {createRouteTripTemplate} from './components/create-route-trip-template';
import {createPriceTripTemplate} from './components/create-price-trip-template';
import {createMenuTripTemplate} from './components/create-menu-trip-template';
import {createFilterTripTemplate} from './components/create-filter-trip-template';
import {createSortTripTemplate} from './components/create-sort-trip-template';
import {createEditFormTripTemplate} from './components/create-edit-form-trip-template';
import {createWayPointTemplate} from './components/create-way-point-template';

renderTemplateContainer(tripMainElement, createPriceTripTemplate(), `afterbegin`);
renderTemplateContainer(tripMainControlsElement, createMenuTripTemplate(), `afterbegin`);
renderTemplateContainer(tripMainControlsElement, createFilterTripTemplate());
renderTemplateContainer(tripEventsElement, createSortTripTemplate());
renderTemplateContainer(tripEventsElement, createRouteTripTemplate());

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < MAX_RENDER_POINT; i++) {
  renderTemplateContainer(tripEventsListElement, createWayPointTemplate());
}

renderTemplateContainer(tripEventsListElement, createEditFormTripTemplate());
