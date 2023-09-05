const express = require("express");

const router = express.Router();

const {
  createCustomOrder,
  getAllUserCustomOrders,
  getCustomOrder,
  createOrderOffer,
  getAllTailorCustomOrders,
  acceptOrderOffer,
  declineOrderOffer,
} = require("../controllers/CustomOrder");

router.post("/create-custom-order", createCustomOrder);

router.post("/create-order-offer", createOrderOffer);

router.get("/get-custom-order/:order_id", getCustomOrder);

router.get("/get-all-user-custom-orders/:user_id", getAllUserCustomOrders);
router.get(
  "/get-all-tailor-custom-orders/:tailor_id",
  getAllTailorCustomOrders
);

router.post("/accept-offer/:orderId", acceptOrderOffer);

router.post("/decline-offer/:orderId", declineOrderOffer);

module.exports = router;
