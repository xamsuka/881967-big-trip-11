import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {moment} from '../utils/util';

const gettingCoutTypeTrip = (typesWaypoint, wayPoints) => {
  return typesWaypoint.map((type) => {
    const wayPointsFilterType = wayPoints.filter((wayPoint) => wayPoint.type.toUpperCase() === type);
    return wayPointsFilterType.length;
  });
};

const gettingUniqueTypeTrip = (wayPoints) => {
  const typeWayPointsAll = wayPoints.map((wayPoint) => wayPoint.type.toUpperCase());

  return Array.from(new Set(typeWayPointsAll));
};

const gettingSummTypeTrip = (typesWaypoint, wayPoints) => {
  return typesWaypoint.map((type) => {
    const wayPointsFilterType = wayPoints.filter((wayPoint) => wayPoint.type.toUpperCase() === type);
    return wayPointsFilterType.reduce((t, {price}) => t + price, 0);
  });
};

const getDiffTimeHours = (wayPoints) => {
  return wayPoints.map((wayPoint) => {
    const startDate = moment(wayPoint.date.startDate);
    const endDate = moment(wayPoint.date.endDate);
    const duration = moment.duration(endDate.diff(startDate));
    return duration.asHours();
  }).reduce((prev, curr) => prev + curr);
};

const gettingCoutTimeTypeTrip = (typesWaypoint, wayPoints) => {
  return typesWaypoint.map((type) => {
    const wayPointsFilterType = wayPoints.filter((wayPoint) => wayPoint.type.toUpperCase() === type);
    return getDiffTimeHours(wayPointsFilterType);
  });
};

const renderMoneyChart = (wayPoints, moneyCtx) => {
  const typeWaypoints = gettingUniqueTypeTrip(wayPoints);
  const summTypes = gettingSummTypeTrip(typeWaypoints, wayPoints);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeWaypoints,
      datasets: [{
        data: summTypes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (wayPoints, transportCtx) => {
  const typeWaypoints = gettingUniqueTypeTrip(wayPoints);
  const countTripTypes = gettingCoutTypeTrip(typeWaypoints, wayPoints);
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeWaypoints,
      datasets: [{
        data: countTripTypes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpentChart = (wayPoints, timeSpentCtx) => {
  const typeWaypoints = gettingUniqueTypeTrip(wayPoints);
  const countTimeTripType = gettingCoutTimeTypeTrip(typeWaypoints, wayPoints);
  return new Chart(timeSpentCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeWaypoints,
      datasets: [{
        data: countTimeTripType,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (`<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart statistics__chart--time" width="900"></canvas>
  </div>
</section>`);
};

export default class Statistics extends AbstractSmartComponent {
  constructor(wayPoints) {
    super();
    this._wayPoints = wayPoints;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._wayPoints);
  }

  rerender(wayPoints) {
    this._wayPoints = wayPoints;

    super.rerender();

    this._renderCharts();
  }

  show() {
    this.rerender(this._wayPoints);
  }

  recoveryListeners() {}

  _renderCharts() {
    const element = this.getElement();
    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 4;

    this._moneyChart = renderMoneyChart(this._wayPoints.getWayPoints(), moneyCtx);
    this._transportChart = renderTransportChart(this._wayPoints.getWayPoints(), transportCtx);
    this._timeSpentChart = renderTimeSpentChart(this._wayPoints.getWayPoints(), timeSpendCtx);
  }
}
