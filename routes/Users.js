const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/Users");

router.post("/sign-up", userControllers.signUpUser);

router.post("/sign-in", userControllers.signInUser);

module.exports = router;
