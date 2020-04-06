const MAX_RENDER_POINT = 3;
const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const renderTemplateContainer = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

import {createRouteTripTemplate} from './components/route-trip';
import {createPriceTripTemplate} from './components/price-trip';
import {createMenuTripTemplate} from './components/menu-trip';
import {createFilterTripTemplate} from './components/filter-trip';
import {createSortTripTemplate} from './components/sort-trip';
import {createEditFormTripTemplate} from './components/edit-form-trip';
import {createWayPointTemplate} from './components/way-point';

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
