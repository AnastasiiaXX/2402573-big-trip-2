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

export const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SortTypes = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const EmptyListMessages = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
