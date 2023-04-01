const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/Users");

router.use("/user", userRoutes);

module.exports = router;
