import NoPointsComponent from '../components/no-points';
import RouteTripComponent from '../components/route-trip';
import RenderComponent from '../utils/render';

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noPointsComponent = new NoPointsComponent();
  }

  render(wayPoints) {
    const renderComponent = new RenderComponent();
    const isAvailable = Object.keys(wayPoints).length === 0;

    if (isAvailable) {
      renderComponent.render(this._container, this._noPointsComponent);
    } else {
      const routeTripComponent = new RouteTripComponent(wayPoints);

      renderComponent.render(this._container, routeTripComponent);
    }

  }
}
