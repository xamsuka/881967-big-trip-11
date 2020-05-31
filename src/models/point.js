export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.destination = {
      name: data.destination.name,
      description: data.destination.description,
      pictures: data.destination.pictures,
    };
    this.date = {
      startDate: data[`date_from`] ? new Date(data[`date_from`]) : null,
      endDate: data[`date_to`] ? new Date(data[`date_to`]) : null,
    };
    this.price = data[`base_price`];
    this.offers = data[`offers`];
    this.isFavorite = data[`is_favorite`];

  }

  static parseWayPoint(data) {
    return new Point(data);
  }

  static parseWayPoints(data) {
    return data.map(Point.parseWayPoint);
  }
}
