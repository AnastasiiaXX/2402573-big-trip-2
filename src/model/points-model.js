import { updateItem } from '../utils/common.js';
import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #tripApiService = null;
  #points = [];

  constructor({ tripApiService }) {
    super();
    this.#tripApiService = tripApiService;
  }

  get points() {
    return [...this.#points];
  }

  set points(points) {
    this.#points = [...points];
  }

  async init() {
    try {
      const points = await this.#tripApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  getById(id) {
    return this.#points.find((point) => point.id === id);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  addPoint(updateType, newPoint) {
    this.#points = [newPoint, ...this.#points];
    this._notify(updateType, newPoint);
  }

  async updatePoint(updateType, updated) {
    const index = this.#points.findIndex((point) => point.id === updated.id);

    if (index === -1) {
      throw new Error('Cannot update unexisting point');
    }

    try {
      const response = await this.#tripApiService.updatePoint(updated);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = updateItem(this.#points, updatedPoint);
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Cannot update point');
    }
  }

  deletePoint(updateType, point) {
    this.#points = this.#points.filter((item) => item.id !== point.id);

    this._notify(updateType);
  }
}
