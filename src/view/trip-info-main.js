import dayjs from 'dayjs';

export const createTripInfoMainTemplate = (data) => {
  data.sort((a, b) => a.time.start - b.time.start);
  const startDate = data[0].time.start;
  const endDate = data[data.length-1].time.end;
  const endDateFormat = dayjs(startDate).format('MMM') !== dayjs(endDate).format('MMM') ? 'MMM D' : 'D';
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

    <p class="trip-info__dates">${dayjs(startDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(endDate).format(endDateFormat)}</p>
  </div>`;
};
