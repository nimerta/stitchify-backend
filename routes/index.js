const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/Users");
const tailorRoutes = require("../routes/Tailors");
const designRoutes = require("../routes/Designs");
const homeRoutes = require("../routes/Home");

router.use("/user", userRoutes);
router.use("/tailor", tailorRoutes);
router.use("/design", designRoutes);
router.use("/home", homeRoutes);

module.exports = router;
