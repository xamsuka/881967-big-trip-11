import InfoTripComponent from './components/price-trip';
import MenuTripComponent, {MenuItem} from './components/menu-trip';
import ButtonAddComponent from './components/button-add';
import FilterController from './controller/filter';
import StatisticsComponent from './components/statistics';
import TripControllerComponent from './controller/trip';
import RenderComponent from './utils/render';
import PointModel from './models/point';
import PointsModel from './models/points';
import API from './api';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const URL = `https://11.ecmascript.pages.academy/big-trip`;

const api = new API(URL, AUTHORIZATION);

const pointsModel = new PointsModel();


const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const renderComponent = new RenderComponent();

const buttonAdd = new ButtonAddComponent();
const menuTripComponent = new MenuTripComponent();
let tripControllerComponent = null;
const filterController = new FilterController(tripMainControlsElement, pointsModel);


api.getWayPoints()
  .then(PointModel.parseWayPoints)
  .then((wayPoints) => {
    console.log(wayPoints);
    pointsModel.setWayPoints(wayPoints);

  });

const DESTINATIONS = [];
const OFFERS = [];

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
      tripControllerComponent = new TripControllerComponent(tripEventsElement, pointsModel, buttonAdd, api);
      tripControllerComponent.render();
    });
  });

  console.log(DESTINATIONS);
  console.log(OFFERS);


renderComponent.render(tripMainElement, new InfoTripComponent(), `afterbegin`);
renderComponent.render(tripMainControlsElement, menuTripComponent);
filterController.render();
renderComponent.render(tripMainElement, buttonAdd);

buttonAdd.setButtonAddClick(() => {
  buttonAdd.updateStatusButton();
  tripControllerComponent.createWayPoint();
  statisticsComponent.hide();
  tripControllerComponent.show();
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
