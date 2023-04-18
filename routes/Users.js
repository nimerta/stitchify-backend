const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/Users");

router.post("/sign-up", userControllers.signUpUser);

router.post("/sign-in", userControllers.signInUser);

router.patch("/submit-measurement/:user_id", userControllers.submitMeasurement);

router.get("/get-measurement/:user_id", userControllers.getMeasurement);

module.exports = router;
