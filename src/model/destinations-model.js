
export default class DestinationsModel {
  #destinations = [];

  get destinations() {
    return [...this.#destinations];
  }

  getById(id) {
    return this.#destinations.find((dest) => dest.id === id);
  }
}
