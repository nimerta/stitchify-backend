const orderTypes = {
  PLACED: "PLACED",
  FINISHED: "FINISHED",
  PREPARING: "PREPARING",
  CANCELLED: "CANCELLED",
  COD: "CASH-ON-DELIVERY",
  PICKUP: "PICKUP",
};

const paymentTypes = {
  NOT_PAID: "NOT-PAID",
  PAID: "PAID",
};

module.exports = {
  orderTypes,
  paymentTypes,
};
