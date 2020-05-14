import InfoTripComponent from './components/price-trip';
import MenuTripComponent from './components/menu-trip';
import FilterComponent from './components/filter-trip';
import TripControllerComponent from './controller/trip';
import {generateWayPoints} from './mock/way-point';
import RenderComponent from './utils/render';


const WAY_POINT = 10;
const renderComponent = new RenderComponent();

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const tripControllerComponent = new TripControllerComponent(tripEventsElement);
const wayPoints = generateWayPoints(WAY_POINT);

renderComponent.render(tripMainElement, new InfoTripComponent(), `afterbegin`);
renderComponent.render(tripMainControlsElement, new MenuTripComponent());
renderComponent.render(tripMainControlsElement, new FilterComponent());

tripControllerComponent.render(wayPoints);
