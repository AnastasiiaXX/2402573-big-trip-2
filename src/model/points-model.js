import {points as pointsMocks} from '../mock/points.js';
import { updateItem } from '../utils/common.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = pointsMocks;

  get points() {
    return [...this.#points];
  }

  set points(points) {
    this.#points = [...points];
  }

  getById(id) {
    return this.#points.find((point) => point.id === id);
  }

  addPoint(updateType, newPoint) {
    this.#points = [newPoint, ...this.#points];
    this._notify(updateType, newPoint);
  }

  updatePoint(updateType, updatedPoint) {
    this.#points = updateItem(this.#points, updatedPoint);

    this._notify(updateType, updatedPoint);
  }

  deletePoint(updateType, point) {
    this.#points = this.#points.filter((item) => item.id !== point.id);

    this._notify(updateType);
  }
}
