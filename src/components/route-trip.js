import {createWayPointTemplate} from './way-point';
import {moment} from '../util';

const MAX_RENDER_POINT = 3;

const createDayRouteMarkup = (dateIndex, wayPoints) => {
  const createWayPoinMarkup = wayPoints.map((wayPoint) => createWayPointTemplate(wayPoint)).join(``);
  const dateRouteTrip = moment(wayPoints[0].date.startDate).format(`YYYY-MM-DD`);
  const mountDay = moment(wayPoints[0].date.startDate).format(`MMM D`);
  return (`
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${dateIndex}</span>
      <time class="day__date" datetime="${dateRouteTrip}">${mountDay}</time>
    </div>
    <ul class="trip-events__list">
    ${createWayPoinMarkup}
    </ul>
  </li>
  `);
};

const createRouteTripTemplate = (wayPoints) => {
  const countDaysTrip = Array.from(new Set(Array.from(wayPoints.map((wayPoint) => wayPoint.date.startDate.getDate()))));
  let daysRouteMarkup = ``;
  let startIndexDay = 1;

  for (const day of countDaysTrip.slice().sort()) {
    const pointInDay = wayPoints.filter((wayPoint) => wayPoint.date.startDate.getDate() === day);
    const pointRender = pointInDay.slice().slice(0, MAX_RENDER_POINT);
    daysRouteMarkup += createDayRouteMarkup(startIndexDay, pointRender);
    startIndexDay++;
  }

  return (
    `<ul class="trip-days">
      ${daysRouteMarkup}
     </ul>`
  );
};

export {createRouteTripTemplate};
