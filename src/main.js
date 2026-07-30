import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripApiService from './trip-api-service.js';

const AUTHORIZATION = 'Basic gg6htysww';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const filterContainer = document.querySelector('.trip-controls__filters');
const newPointButton = document.querySelector('.trip-main__event-add-btn');
const mainElement = document.querySelector('.trip-events');

const tripApiService = new TripApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel({ tripApiService });
const destinationsModel = new DestinationsModel({ tripApiService });
const offersModel = new OffersModel({ tripApiService });
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

newPointButton.disabled = true;

// Справочники (пункты назначения и офферы) загружаются до точек,
// так как точки ссылаются на них по id
Promise.all([
  destinationsModel.init(),
  offersModel.init(),
])
  .then(() => pointsModel.init())
  .catch(() => {
    boardPresenter.showLoadError();
  })
  .finally(() => {
    newPointButton.disabled = false;
  });
