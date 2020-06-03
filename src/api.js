import PointModel from './models/point';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(urlApi, authorization) {
    this._authorization = authorization;
    this._urlApi = urlApi;
  }

  getWayPoints() {
    return this._load({url: `points`});
  }

  getDestinations() {
    return this._load({url: `destinations`});
  }

  getOffers() {
    return this._load({url: `offers`});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {

    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._urlApi}/${url}`, {method, body, headers})
      .then(checkStatus)
      .then((response) => response.json())
      .catch(() => {
        return {};
      });
  }

  updateWayPoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(PointModel.parseWayPoint);
  }

  createWayPoint(wayPoint) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(wayPoint.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(PointModel.parseWayPoint);
  }

  deleteWayPoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });
  }
}
