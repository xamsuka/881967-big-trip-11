import MenuTripComponent, {MenuItem} from './components/menu-trip';
import ButtonAddComponent from './components/button-add';
import FilterController from './controller/filter';
import StatisticsComponent from './components/statistics';
import TripControllerComponent from './controller/trip';
import LoadingComponent from './components/loading';
import RenderComponent from './utils/render';
import PointModel from './models/point';
import PointsModel from './models/points';
import API from './api';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const URL = `https://11.ecmascript.pages.academy/big-trip`;
const DESTINATIONS = [];
const OFFERS = [];

const api = new API(URL, AUTHORIZATION);
const pointsModel = new PointsModel();

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const renderComponent = new RenderComponent();
const buttonAdd = new ButtonAddComponent();
const loadingComponent = new LoadingComponent();
const menuTripComponent = new MenuTripComponent();
let tripControllerComponent = null;
const filterController = new FilterController(tripMainControlsElement, pointsModel);


api.getWayPoints()
  .then((response) => {
    renderComponent.render(tripEventsElement, loadingComponent);
    return response;
  })
  .then(PointModel.parseWayPoints)
  .then((wayPoints) => {
    pointsModel.setWayPoints(wayPoints);
  });

api.getDestinations()
  .then((destinations) => {
    destinations.forEach((destination) => {
      DESTINATIONS.push(destination);
    });
  })
  .then(() => {
    api.getOffers()
    .then((offers) => {
      offers.forEach((offer) => {
        OFFERS.push(offer);
      });
    })
    .then(() => {
      renderComponent.remove(loadingComponent);
      tripControllerComponent.render();
    });
  });

renderComponent.render(tripMainControlsElement, menuTripComponent);
tripControllerComponent = new TripControllerComponent(tripEventsElement, pointsModel, buttonAdd, api);
filterController.render();
renderComponent.render(tripMainElement, buttonAdd);

buttonAdd.setButtonAddClick(() => {
  tripControllerComponent.show();
  buttonAdd.updateStatusButton();
  menuTripComponent.resetMenuActive();
  filterController._resetFilterType();
  tripControllerComponent.createWayPoint();
  statisticsComponent.hide();
});

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

export {DESTINATIONS, OFFERS};
