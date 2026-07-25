import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const newPointButton = document.querySelector('.trip-main__event-add-btn');
const mainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filtersModel = new FiltersModel();

const filterPresenter = new FilterPresenter({
  filterContainer,
  filtersModel,
  pointsModel
});

const boardPresenter = new BoardPresenter({
  container: mainElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filtersModel,
  newPointButton,
});

filterPresenter.init();
boardPresenter.init();
