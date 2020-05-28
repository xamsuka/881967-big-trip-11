import InfoTripComponent from './components/price-trip';
import MenuTripComponent, {MenuItem} from './components/menu-trip';
import ButtonAddComponent from './components/button-add';
import FilterController from './controller/filter';
import StatisticsComponent from './components/statistics';
import TripControllerComponent from './controller/trip';
import RenderComponent from './utils/render';
import PointsModel from './models/points';
import {generateWayPoints} from './mock/way-point';

const WAY_POINT = 2;
const wayPoints = generateWayPoints(WAY_POINT);

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const renderComponent = new RenderComponent();
const pointsModel = new PointsModel();
pointsModel.setWayPoints(wayPoints);
const buttonAdd = new ButtonAddComponent();
const menuTripComponent = new MenuTripComponent();
const filterController = new FilterController(tripMainControlsElement, pointsModel);
const tripControllerComponent = new TripControllerComponent(tripEventsElement, pointsModel, buttonAdd);


renderComponent.render(tripMainElement, new InfoTripComponent(), `afterbegin`);
renderComponent.render(tripMainControlsElement, menuTripComponent);
filterController.render();
renderComponent.render(tripMainElement, buttonAdd);

buttonAdd.setButtonAddClick(() => {
  tripControllerComponent.createWayPoint();
  statisticsComponent.hide();
  tripControllerComponent.show();
  buttonAdd.updateStatusButton();
});

tripControllerComponent.render();
const statisticsComponent = new StatisticsComponent(pointsModel);
renderComponent.render(tripEventsElement, statisticsComponent, `after`);
statisticsComponent.hide();

menuTripComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      statisticsComponent.hide();
      tripControllerComponent.show();
      break;
    case MenuItem.STATISTICS:
      statisticsComponent.show();
      tripControllerComponent.hide();
  }
});
