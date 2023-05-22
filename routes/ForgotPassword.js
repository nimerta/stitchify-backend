const express = require("express");

const router = express.Router();

const forgotPasswordControllers = require("../controllers/ForgotPassword");

router.post("/check-user", forgotPasswordControllers.checkUserEmail);

router.get(
  "/send-otp-email/:email",
  forgotPasswordControllers.sendForgotPasswordOtpEmail
);

router.post(
  "/verify-otp/:email_address",
  forgotPasswordControllers.verifyForgotPasswordOtp
);

router.patch(
  "/update-password/:email_address",
  forgotPasswordControllers.updatePassword
);

module.exports = router;
