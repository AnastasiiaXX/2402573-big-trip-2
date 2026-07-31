import dayjs from 'dayjs';

export const sortByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return pointBDuration - pointADuration;
};
