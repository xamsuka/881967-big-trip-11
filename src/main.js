import InfoTripComponent from './components/price-trip';
import MenuTripComponent from './components/menu-trip';
import FilterComponent from './components/filter-trip';
import SortComponent from './components/sort-trip';
import TripControllerComponent from './controller/trip-controller';
import {generateWayPoints} from './mock/way-point';
import {renderComponent} from './utils/render';

const WAY_POINT = 10;
const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const tripControllerComponent = new TripControllerComponent(tripEventsElement);
const wayPoints = generateWayPoints(WAY_POINT);

renderComponent(tripMainElement, new InfoTripComponent(), `afterbegin`);
renderComponent(tripMainControlsElement, new MenuTripComponent());
renderComponent(tripMainControlsElement, new FilterComponent());
renderComponent(tripEventsElement, new SortComponent());

tripControllerComponent.render(wayPoints);
