export const moment = require(`moment`);
require(`moment-precise-range-plugin`);

const getRandomNumber = (min = 0, max = 10) => {
  return Math.floor(Math.random(min) * max);
};

const getRandomBooleanValue = () => {
  return Math.random() > 0.5;
};

const formateDateTime = (date) => {
  const hourse = String(date.getHours()).padStart(2, `0`);
  const minutes = String(date.getMinutes()).padStart(2, `0`);
  return `${hourse}:${minutes}`;
};

const getdiffTime = (date) => {
  const diffTime = moment.preciseDiff(date.startDate, date.endDate, true);
  return diffTime;
};

export {getRandomNumber, getRandomBooleanValue, formateDateTime, getdiffTime};
