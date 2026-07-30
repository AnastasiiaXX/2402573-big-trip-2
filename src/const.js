export const POINT_TYPES = [
  'flight',
  'bus',
  'taxi',
  'restaurant',
  'sightseeing',
  'check-in',
  'train',
  'ship',
  'drive'
];

export const DATE_FORMAT = 'MMM DD';

export const TIME_FORMAT = 'HH:mm';

export const DATE_AND_TIME_FORMAT = 'DD/MM/YY HH:mm';

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  ERROR: 'ERROR'
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
