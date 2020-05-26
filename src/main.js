import InfoTripComponent from './components/price-trip';
import MenuTripComponent from './components/menu-trip';
import ButtonAddComponent from './components/button-add';
import FilterController from './controller/filter';
import TripControllerComponent from './controller/trip';
import RenderComponent from './utils/render';
import PointsModel from './models/points';
import {generateWayPoints} from './mock/way-point';
import {Mode as WayPointControllerMode} from './controller/trip';

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
const buttonAdd = new ButtonAddComponent();
const tripControllerComponent = new TripControllerComponent(tripEventsElement, pointsModel, buttonAdd);

renderComponent.render(tripMainElement, new InfoTripComponent(), `afterbegin`);
renderComponent.render(tripMainControlsElement, new MenuTripComponent());
const filterController = new FilterController(tripMainControlsElement, pointsModel);
filterController.render();


renderComponent.render(tripMainElement, buttonAdd);

buttonAdd.setButtonAddClick(() => {
  tripControllerComponent.createWayPoint();
  buttonAdd.updateStatusButton();
});

tripControllerComponent.render();
