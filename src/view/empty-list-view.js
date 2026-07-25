import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const EmptyListTextType = {
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
};

function createEmptyListTemplate(filterType) {
  const emptyListTextValue = EmptyListTextType[filterType];

  return `<p class="trip-events__msg">${emptyListTextValue}</p>`;
}

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
