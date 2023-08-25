const express = require("express");

const router = express.Router();

const {
  activateAddress,
  addNewAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/Addresses");

router.post("/add-new-address", addNewAddress);

router.post("/activate-address", activateAddress);

router.get("/get-user-address-list/:user_id", getUserAddresses);

router.put("/update-address/:address_id", updateAddress);

router.delete("/delete-address/:address_id", deleteAddress);

module.exports = router;
