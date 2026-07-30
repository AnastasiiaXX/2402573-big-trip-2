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
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleFormClose = null;

  constructor({ container, offersModel, destinationsModel, onDataChange, onFormClose }) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleFormClose = onFormClose;
  }

  init() {
    this.#formComponent = new EditFormView({
      point: EMPTY_POINT,
      allOffers: this.#offersModel.offers,
      allDestinations: this.#destinationsModel.destinations,
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

  setSaving() {
    this.#formComponent.updateElement({
      isSaving: true,
    });
  }

  setAborting() {
    this.#formComponent.updateElement({
      isSaving: false,
      isDeleting: false,
    });

    this.#formComponent.shake();
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
  };

  #cancelClickHandler = () => {
    this.destroy();
  };
}

