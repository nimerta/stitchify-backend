const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/Users");
const tailorRoutes = require("../routes/Tailors");
const designRoutes = require("../routes/Designs");
const homeRoutes = require("../routes/Home");
const forgotPasswordRoutes = require("../routes/ForgotPassword");
const standardOrderRoutes = require("../routes/StandardOrder");
const addressesRoutes = require("../routes/Addresses");
const areaRoutes = require("../routes/Area");
const customOrderRoutes = require("../routes/CustomOrder");

router.use("/user", userRoutes);
router.use("/tailor", tailorRoutes);
router.use("/design", designRoutes);
router.use("/home", homeRoutes);
router.use("/forgot-password", forgotPasswordRoutes);
router.use("/standard-order", standardOrderRoutes);
router.use("/custom-order", customOrderRoutes);

router.use("/address", addressesRoutes);
router.use("/area", areaRoutes);

module.exports = router;
