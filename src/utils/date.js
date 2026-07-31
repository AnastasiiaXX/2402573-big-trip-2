import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DATE_AND_TIME_FORMAT, DATE_FORMAT, TIME_FORMAT, TRIP_INFO_DATE_FORMAT } from '../const.js';

dayjs.extend(duration);

const padNumber = (num) => String(num).padStart(2, '0');

const humanizeDate = (date) => date ? dayjs(date).format(DATE_FORMAT).toUpperCase() : '';

const humanizeTime = (time) => time ? dayjs(time).format(TIME_FORMAT) : '';

const humanizeFullDate = (date) => date ? dayjs(date).format(DATE_AND_TIME_FORMAT) : '';

const humanizeTripInfoDate = (date) => dayjs(date).format(TRIP_INFO_DATE_FORMAT);

const countDuration = (dateTo, dateFrom) => {
  const diff = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

  const days = padNumber(Math.floor(diff.asDays()));
  const hours = padNumber(diff.hours());
  const minutes = padNumber(diff.minutes());

  if (diff.asDays() >= 1) {
    return `${days}D ${hours}H ${minutes}M`;
  }
  if (diff.asHours() >= 1) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

export {humanizeDate, humanizeTime, humanizeFullDate, humanizeTripInfoDate, countDuration};
