import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FilterType } from '../const.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const isFuturePoint = (point) => dayjs(point.dateFrom).isAfter(dayjs());

const isPresentPoint = (point) => dayjs(point.dateFrom).isSameOrBefore(dayjs()) && dayjs(point.dateTo).isSameOrAfter(dayjs());

const isPastPoint = (point) => dayjs(point.dateTo).isBefore(dayjs());

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isFuturePoint),
  [FilterType.PRESENT]: (points) => points.filter(isPresentPoint),
  [FilterType.PAST]: (points) => points.filter(isPastPoint),
};
