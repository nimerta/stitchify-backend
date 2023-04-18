const express = require("express");

const router = express.Router();

const tailorControllers = require("../controllers/Tailors");

router.post("/sign-up", tailorControllers.tailorSignUp);

router.post("/sign-in", tailorControllers.tailorSignIn);

router.get(
  "/get-tailor-designs/:tailor_id",
  tailorControllers.getTailorDesigns
);

module.exports = router;
