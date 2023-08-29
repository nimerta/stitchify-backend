const orderTypes = {
  PLACED: "PLACED",
  PREPARING: "IN-PROCESS",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  DELIVERED: "DELIVERED",
};

const paymentTypes = {
  NOT_PAID: "NOT-PAID",
  PAID: "PAID",
};

const paymentMethodTypes = {
  COD: "CASH-ON-DELIVERY",
  PICKUP: "PICKUP",
};

module.exports = {
  orderTypes,
  paymentTypes,
  paymentMethodTypes,
};
