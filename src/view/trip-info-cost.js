export const createTripInfoCostTemplate = (data) => {
  const total = data.reduce((acc, item) => acc + item.cost, 0);
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>`;
};
