export default class Utils {
  constructor() {
    this.moment = require(`moment`);
    require(`moment-precise-range-plugin`);
  }

  getRandomNumber(min = 0, max = 10) {
    return Math.floor(Math.random(min) * max);
  }

  getRandomBooleanValue() {
    return Math.random() > 0.5;
  }

  formateDateTime(date) {
    const hourse = String(date.getHours()).padStart(2, `0`);
    const minutes = String(date.getMinutes()).padStart(2, `0`);
    return `${hourse}:${minutes}`;
  }

  getdiffTime(date) {
    const diffTime = this.moment.preciseDiff(date.startDate, date.endDate, true);
    return diffTime;
  }
}
