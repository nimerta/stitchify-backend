const express = require("express");

const router = express.Router();

const {
  activateAddress,
  addNewAddress,
  getUserAddresses,
  updateAddress,
} = require("../controllers/Addresses");

router.post("/add-new-address", addNewAddress);

router.post("/activate-address", activateAddress);

router.get("/get-user-address-list/:user_id", getUserAddresses);

router.put("/update-address/:address_id", updateAddress);

module.exports = router;
