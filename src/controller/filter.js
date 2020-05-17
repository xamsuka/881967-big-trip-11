import RenderComponent from '../utils/render';
import FilterTripComponent from '../components/filter-trip';
import {FiltersType} from '../const';

export default class FilterController {
  constructor(container, wayPointModel) {
    this._container = container;
    this._wayPointModel = wayPointModel;
    this._renderComponent = new RenderComponent();
    this._activeFilter = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const filterTripComponent = new FilterTripComponent();
    this._renderComponent.render(this._container, filterTripComponent);

    filterTripComponent.setSortTypeChangeHandler(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    this._wayPointModel.setActiveFilter(filterType);
    this._activeFilter = filterType;
  }
}
