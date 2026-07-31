const POINT_TYPES = [
  'flight',
  'bus',
  'taxi',
  'restaurant',
  'sightseeing',
  'check-in',
  'train',
  'ship',
  'drive',
];

const DATE_FORMAT = 'MMM DD';

const TIME_FORMAT = 'HH:mm';

const DATE_AND_TIME_FORMAT = 'DD/MM/YY HH:mm';

const TRIP_INFO_DATE_FORMAT = 'D MMM';

const FLATPICKR_DATE_FORMAT = 'd/m/y H:i';

const FIRST_DAY_OF_WEEK = 1;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  ERROR: 'ERROR',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export { POINT_TYPES, DATE_FORMAT, DATE_AND_TIME_FORMAT, TIME_FORMAT, TRIP_INFO_DATE_FORMAT, FLATPICKR_DATE_FORMAT, FIRST_DAY_OF_WEEK,
  FilterType, SortType, UserAction, UpdateType, TimeLimit
};
