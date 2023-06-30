const express = require("express");

const router = express.Router();

const {
  createStandardOrder,
  getStandardOrder,
  updateStandardOrderPaymentStatus,
  updateStandardOrderStatus,
} = require("../controllers/StandardOrder");

router.post("/create-standard-order", createStandardOrder);

router.get("/get-standard-order/:order_id", getStandardOrder);

router.patch(
  "/update-standard-order-status/:order_id",
  updateStandardOrderStatus
);

router.patch(
  "/update-standard-order-payment-status/:order_id",
  updateStandardOrderPaymentStatus
);

module.exports = router;
