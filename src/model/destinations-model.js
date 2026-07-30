export default class DestinationsModel {
  #destinations = [];
  #tripApiService = null;

  constructor({ tripApiService }) {
    this.#tripApiService = tripApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#tripApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }

  get destinations() {
    return [...this.#destinations];
  }

  getById(id) {
    return this.#destinations.find((dest) => dest.id === id);
  }
}
