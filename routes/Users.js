const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/Users");

const { getUserOrders } = require("../controllers/StandardOrder");

router.post("/sign-up", userControllers.signUpUser);

router.post("/sign-in", userControllers.signInUser);

router.get("/get-user/:user_id", userControllers.getUser);

router.patch(
  "/update-profile-picture/:user_id",
  userControllers.updateProfilePicture
);

router.post("/add-design-to-cart", userControllers.addDesignToCart);

router.post("/remove-design-from-cart", userControllers.removeDesignFromCart);

router.put("/update-user/:id", userControllers.updateUserById);

router.patch("/submit-measurement/:user_id", userControllers.submitMeasurement);

router.get("/get-measurement/:user_id", userControllers.getMeasurement);

router.get("/get-user-cart/:user_id", userControllers.getUserCart);
router.get("/get-user-order-history/:user_id", getUserOrders);

module.exports = router;
