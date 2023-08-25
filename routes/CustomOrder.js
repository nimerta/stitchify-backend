const express = require("express");

const router = express.Router();

const {
  createCustomOrder,
  getAllUserCustomOrders,
  getCustomOrder,
} = require("../controllers/CustomOrder");

router.post("/create-custom-order", createCustomOrder);

router.get("/get-custom-order/:order_id", getCustomOrder);

router.get("/get-all-user-custom-orders/:user_id", getAllUserCustomOrders);

module.exports = router;
