import InfoTripComponent from './components/price-trip';
import MenuTripComponent from './components/menu-trip';
import FilterController from './controller/filter';
import TripControllerComponent from './controller/trip';
import RenderComponent from './utils/render';
import PointsModel from './models/points';
import {generateWayPoints} from './mock/way-point';


const WAY_POINT = 2;
const wayPoints = generateWayPoints(WAY_POINT);

const renderComponent = new RenderComponent();
const pointsModel = new PointsModel();

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);


pointsModel.setWayPoints(wayPoints);
const tripControllerComponent = new TripControllerComponent(tripEventsElement, pointsModel);

renderComponent.render(tripMainElement, new InfoTripComponent(), `afterbegin`);
renderComponent.render(tripMainControlsElement, new MenuTripComponent());
const filterController = new FilterController(tripMainControlsElement, pointsModel);
filterController.render();


tripControllerComponent.render();
