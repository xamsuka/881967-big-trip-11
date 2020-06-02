import RenderComponent from '../utils/render';
import FilterTripComponent from '../components/filter-trip';
import {FiltersType} from '../const';
export default class FilterController {
  constructor(container, wayPointModel) {
    this._container = container;
    this._wayPointModel = wayPointModel;
    this._filterTripComponent = new FilterTripComponent();
    this._renderComponent = new RenderComponent();
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    this._renderComponent.render(this._container, this._filterTripComponent);

    this._filterTripComponent.setFilterTypeChangeHandler(this._onFilterChange);
  }

  _resetFilterType() {
    const filterType = this._filterTripComponent.getFiltersType();
    if (filterType !== FiltersType.EVERYTHING) {
      this._filterTripComponent.resetFiltersType();
    }
  }

  _onFilterChange(filterType) {
    this._wayPointModel.setActiveFilter(filterType);
  }
}
