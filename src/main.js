import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic gg6htysww';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const filterContainer = document.querySelector('.trip-controls__filters');
const newPointButton = document.querySelector('.trip-main__event-add-btn');
const mainElement = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel({ pointsApiService });
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
pointsModel.init();
