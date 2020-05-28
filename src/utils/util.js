export const moment = require(`moment`);
require(`moment-precise-range-plugin`);

export default class Utils {
  constructor() {
    this._ENTER_KEY = `Enter`;
    this._ESC_KEY = `Escape`;
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

  getDiffTime(date) {
    const diffTime = moment.preciseDiff(date.startDate, date.endDate, true);
    return diffTime;
  }

  isEscapePress(evt, action) {
    if (evt.key === this._ESC_KEY) {
      action();
    }
  }

  isEnterPress(evt, action) {
    if (evt.key === this._ENTER_KEY) {
      action();
    }
  }
}
