import {createWayPointTemplate} from './way-point';

const createDayRouteMarkup = (date, wayPoints) => {
  const createWayPoinMarkup = wayPoints.map((wayPoint) => createWayPointTemplate(wayPoint));
  const dateRouteTrip = moment(wayPoints[0].date.startDate).format(`YYYY-MM-DD`);
  const mountDay = moment(wayPoints[0].date.startDate).format(`MMM D`);
  return (`
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${date}</span>
      <time class="day__date" datetime="${dateRouteTrip}">${mountDay}</time>
    </div>
    <ul class="trip-events__list">
    ${createWayPoinMarkup}
    </ul>
  </li>
  `);
};

const createRouteTripTemplate = (wayPoints) => {
  const countDaysTrip = new Set(Array.from(wayPoints.map((wayPoint) => wayPoint.date.startDate.getDate())));
  let daysRouteMarkup = ``;
  countDaysTrip.forEach((day) => {
    const pointInDay = wayPoints.filter((wayPoint) => wayPoint.date.startDate.getDate() === day);
    daysRouteMarkup += createDayRouteMarkup(day, pointInDay);
  });

  return (
    `<ul class="trip-days">
      ${daysRouteMarkup}
     </ul>`
  );
};

export {createRouteTripTemplate};
