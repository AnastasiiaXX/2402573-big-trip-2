import { FilterTypes, SortTypes, UpdateType, UserAction } from '../const.js';
import { render, remove } from '../framework/render.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/sort.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #listComponent = new ListView();
  #sortComponent = null;
  #emptyListComponent = null
  #currentSortType = SortTypes.DEFAULT;
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointPresenters = new Map();

  constructor({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handlePointsModelChange);
  }

  get points() {
    let sorter = sortByDay;

    switch (this.#currentSortType) {
      case SortTypes.TIME:
        sorter = sortByTime;
        break;
      case SortTypes.PRICE:
        sorter = sortByPrice;
        break;
    }

    return [...this.#pointsModel.points].sort(sorter);
  }

  init() {
    this.#renderList();
  }

  #getPointData(point) {
    return {
      destination: this.#destinationsModel.getById(point.destination),
      checkedOffers: this.#offersModel.getByIds(point.offers),
      allOffers: this.#offersModel.offers,
      allDestinations: this.#destinationsModel.destinations,
    };
  }

  #renderPoint(point) {
    const { destination, checkedOffers, allOffers, allDestinations } = this.#getPointData(point);

    const pointPresenter = new PointPresenter({
      container: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, destination, checkedOffers, allOffers, allDestinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderList() {
    if (this.points.length === 0) {
      this.#emptyListComponent = new EmptyListView({ filterType: FilterTypes.EVERYTHING });
      render(this.#emptyListComponent, this.#container);
      return;
    }

    this.#renderSort();
    render(this.#listComponent, this.#container);

    this.#renderPoints();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#container);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => {
      presenter.destroy();
    });
    this.#pointPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortTypes.DEFAULT;
    }
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handlePointsModelChange = (updateType, updatedPoint) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        const { destination, checkedOffers, allOffers, allDestinations } = this.#getPointData(updatedPoint);
        this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, destination, checkedOffers, allOffers, allDestinations);
      }
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderList();
  };
}
