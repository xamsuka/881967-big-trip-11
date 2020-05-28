import UtilsComponent from '../utils/util';

const DESTANTION = [`Omsk`, `Moscow`, `Novosibirsk`, `Yekaterinburg`, `Anapa`, `Vladivostok`, `Vladimir`, `Vorkuta`, `Irkutsk`, `Kaluga`, `Kemerovo`, `Lensk`, `Magadan`, `Norilsk`];
const DESCRIPTION = [
  `Lorem ipsum dolor sit amet`, `consectetur adipiscing elit. Cras aliquet varius magna`,
  `non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex`,
  `convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris`,
  `condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit`,
  `eros vel aliquam faucibus, purus ex euismod diam`,
  `eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
const utilsComponent = new UtilsComponent();
const stopPoint = [`Check-in`, `Sightseeing`, `Restaurant`];
const rideVehicle = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const pointTrip = [...stopPoint, ...rideVehicle];
const wayPointOptions = {
  'luggage': {
    name: `Add luggage`,
    price: 30,
  },
  'comfort': {
    name: `Switch to comfort class`,
    price: 100,
  },
  'meal': {
    name: `Add meal`,
    price: 15,
  },
  'seats': {
    name: `Choose seats`,
    price: 5,
  },
  'train': {
    name: `Travel by train`,
    price: 40,
  },
};

const generateWayPointOptions = () => {
  return Object.keys(wayPointOptions).slice(0, utilsComponent.getRandomNumber(0, wayPointOptions.length)).reduce((result, key) => {
    result[key] = wayPointOptions[key];

    return result;
  }, {});
};

const generateInfoWayPoint = () => {
  return [`http://picsum.photos/248/152?r=${utilsComponent.getRandomNumber()}`];
};

const generateDate = () => {
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() + utilsComponent.getRandomNumber(0, 2));
  endDate.setHours(startDate.getHours() + utilsComponent.getRandomNumber(2, 4));
  endDate.setDate(startDate.getDate() + utilsComponent.getRandomNumber(0, 1));

  return {
    [`startDate`]: startDate,
    [`endDate`]: endDate,
  };
};

const generateWayPoint = () => {
  return {
    id: utilsComponent.getRandomNumber(0, 1500),
    type: pointTrip[utilsComponent.getRandomNumber(0, pointTrip.length)],
    destantion: DESTANTION[utilsComponent.getRandomNumber(0, DESTANTION.length)],
    date: generateDate(),
    price: utilsComponent.getRandomNumber(0, 500),
    options: generateWayPointOptions(),
    info: {
      description: DESCRIPTION.slice().slice(utilsComponent.getRandomNumber(0, DESCRIPTION.length, DESCRIPTION.length)),
      photos: generateInfoWayPoint(),
    },
    isFavorite: utilsComponent.getRandomBooleanValue(),
  };
};

const generateWayPoints = (count) => {
  const wayPoints = new Array(count).fill(``).map(generateWayPoint);
  return wayPoints;
};

export {generateWayPoints};
