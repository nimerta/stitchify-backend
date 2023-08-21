const express = require("express");

const router = express.Router();

const tailorControllers = require("../controllers/Tailors");
const {
  getTailorPlacedOrders,
  getTailorCompletedOrders,
  getTailorConfirmedOrders,
  getTailorInProcessOrders,
} = require("../controllers/StandardOrder");

router.post("/sign-up", tailorControllers.tailorSignUp);

router.post("/sign-in", tailorControllers.tailorSignIn);

router.get(
  "/get-tailor-designs/:tailor_id",
  tailorControllers.getTailorDesigns
);

router.get("/get-pending-orders/:tailor_id", getTailorPlacedOrders);

module.exports = router;
