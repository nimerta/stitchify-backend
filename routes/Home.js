const express = require("express");
const router = express.Router();

const homeControllers = require("../controllers/Home");

router.get("/get-designs-for-you", homeControllers.getDesignsForYou);

router.get(
  "/get-designs-for-type/:design_for",
  homeControllers.getDesignsForType
);

module.exports = router;
