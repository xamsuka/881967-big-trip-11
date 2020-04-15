import {getRandomNumber} from '../util';

const DESTANTION = [`Omsk`, `Moscow`, `Novosibirsk`, `Yekaterinburg`, `Anapa`, `Vladivostok`, `Vladimir`, `Vorkuta`, `Irkutsk`, `Kaluga`, `Kemerovo`, `Lensk`, `Magadan`, `Norilsk`];
const DESCRIPTION = [
  `Lorem ipsum dolor sit amet`, `consectetur adipiscing elit. Cras aliquet varius magna`,
  `non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex`,
  `convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris`,
  `condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit`,
  `eros vel aliquam faucibus, purus ex euismod diam`,
  `eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
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
  return Object.keys(wayPointOptions).slice(0, getRandomNumber(0, wayPointOptions.length)).reduce((result, key) => {
    result[key] = wayPointOptions[key];

    return result;
  }, {});
};

const generateInfoWayPoint = () => {
  return {
    description: DESCRIPTION.slice().slice(getRandomNumber(0, DESCRIPTION.length, DESCRIPTION.length)),
    photo: `http://picsum.photos/248/152?r=${getRandomNumber()}`,
  };
};

const generateDate = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(startDate.getHours() + getRandomNumber(0, 12));

  return {
    [`startDate`]: startDate,
    [`endDate`]: endDate,
  };
};

const generateWayPoint = () => {
  return {
    type: pointTrip[getRandomNumber(0, pointTrip.length)],
    destantion: DESTANTION[getRandomNumber(0, DESTANTION.length)],
    date: generateDate(),
    options: generateWayPointOptions(),
    info: generateInfoWayPoint(),
  };
};

const generateWayPoints = (count) => {
  const wayPoints = new Array(count).fill(``).map(generateWayPoint);
  return wayPoints;
};

export {generateWayPoints};
