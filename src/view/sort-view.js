import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--${SortType.DEFAULT}">
              <input id="sort-${SortType.DEFAULT}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${SortType.DEFAULT}"
              ${currentSortType === SortType.DEFAULT ? 'checked' : ''}
              >
              <label class="trip-sort__btn" for="sort-${SortType.DEFAULT}" data-sort-type="${SortType.DEFAULT}">${SortType.DEFAULT}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
              <input id="sort-${SortType.TIME}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${SortType.TIME}"
              ${currentSortType === SortType.TIME ? 'checked' : ''}
              >
              <label class="trip-sort__btn" for="sort-${SortType.TIME}" data-sort-type="${SortType.TIME}">${SortType.TIME}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.PRICE}">
              <input id="sort-${SortType.PRICE}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${SortType.PRICE}"
              ${currentSortType === SortType.PRICE ? 'checked' : ''}
              >
              <label class="trip-sort__btn" for="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}">${SortType.PRICE}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ onSortTypeChange, currentSortType }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#onSortTypeChange);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #onSortTypeChange = (evt) => {
    if (!evt.target.dataset.sortType) {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
