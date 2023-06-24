const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/Users");
const tailorRoutes = require("../routes/Tailors");
const designRoutes = require("../routes/Designs");
const homeRoutes = require("../routes/Home");
const forgotPasswordRoutes = require("../routes/ForgotPassword");

router.use("/user", userRoutes);
router.use("/tailor", tailorRoutes);
router.use("/design", designRoutes);
router.use("/home", homeRoutes);
router.use("/forgot-password", forgotPasswordRoutes);

module.exports = router;
