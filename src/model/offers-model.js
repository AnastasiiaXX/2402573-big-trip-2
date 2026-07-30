export default class OffersModel {
  #offers = [];
  #tripApiService = null;

  constructor({ tripApiService }) {
    this.#tripApiService = tripApiService;
  }

  async init() {
    try {
      this.#offers = await this.#tripApiService.offers;
    } catch (err) {
      this.#offers = [];
      throw err;
    }
  }

  get offers() {
    return this.#offers;
  }

  getById(id) {
    const flattenOffers = this.#offers.flatMap((item) => item.offers);
    return flattenOffers.find((offer) => offer.id === id);
  }

  getByIds(offersIds) {
    return offersIds.map((id) => this.getById(id)).filter(Boolean);
  }
}
