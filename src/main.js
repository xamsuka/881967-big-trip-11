import InfoTripComponent from './components/price-trip';
import MenuTripComponent from './components/menu-trip';
import FilterComponent from './components/filter-trip';
import SortComponent from './components/sort-trip';
import RouteTripComponent from './components/route-trip';
import WayPointComponent from './components/way-point';
import EditFormTripComponent from './components/edit-form-trip';
import {generateWayPoints} from './mock/way-point';
import {renderComponent} from './utils/render';

const WAY_POINT = 10;
const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const wayPoints = generateWayPoints(WAY_POINT);

renderComponent(tripMainElement, new InfoTripComponent(), `afterbegin`);
renderComponent(tripMainControlsElement, new MenuTripComponent());
renderComponent(tripMainControlsElement, new FilterComponent());
renderComponent(tripEventsElement, new SortComponent());
renderComponent(tripEventsElement, new RouteTripComponent(wayPoints));

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
renderComponent(tripEventsListElement, new EditFormTripComponent(wayPoints[0]));
