const express = require("express");

const router = express.Router();

const {
  createStandardOrder,
  getStandardOrder,
  updateStandardOrderPaymentStatus,
  updateStandardOrderStatus,
  getTailorPlacedOrders,
  completeOrder,
  getUserOrders,
} = require("../controllers/StandardOrder");

router.post("/create-standard-order", createStandardOrder);

router.get("/get-standard-order/:order_id", getStandardOrder);

router.get("/get-all-tailor-standard-order/:tailor_id", getTailorPlacedOrders);

router.get("/get-all-user-standard-order/:user_id", getUserOrders);

router.patch(
  "/update-standard-order-status/:order_id",
  updateStandardOrderStatus
);

router.patch(
  "/update-standard-order-payment-status/:order_id",
  updateStandardOrderPaymentStatus
);

router.patch("/complete-standard-order/:orderId", completeOrder);

module.exports = router;
