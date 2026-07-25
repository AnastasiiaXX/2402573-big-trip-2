import {render, remove, RenderPosition} from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import EditFormView from '../view/edit-form-view.js';

const EMPTY_POINT = {
  type: 'flight',
  destination: '',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  offers: [],
  isFavorite: false,
};

export default class NewPointPresenter {
  #container = null;
  #formComponent = null;
  #allOffers = [];
  #allDestinations = [];
  #handleDataChange = null;
  #handleFormClose = null;

  constructor({ container, allOffers, allDestinations, onDataChange, onFormClose }) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleFormClose = onFormClose;
  }

  init() {
    this.#formComponent = new EditFormView({
      point: EMPTY_POINT,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onFormSubmit: this.#onFormSubmit,
      onCancelClick: this.#cancelClickHandler,
      isEditMode: false,
    });

    render(this.#formComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#formComponent === null) {
      return;
    }
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#formComponent);
    this.#handleFormClose();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #onFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );

    this.destroy();
  };

  #cancelClickHandler = () => {
    this.destroy();
  };
}

