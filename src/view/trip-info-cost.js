export const createTripInfoCostTemplate = (data) => {
  let total = 0;
  data.forEach((item) => total = total + item.cost);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>`;
};
