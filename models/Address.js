const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: false,
    required: false,
  },
  area: {
    type: String,
    default: "",
    required: false,
  },
  main_address: {
    type: String,
    default: "",
    required: false,
  },
  apartment_or_street: {
    type: String,
    default: "",
    required: false,
  },
  city: {
    type: String,
    default: "",
    required: false,
  },
  country: {
    type: String,
    default: "",
    required: false,
  },
  state: {
    type: String,
    default: "",
    required: false,
  },
  zip_code: {
    type: String,
    default: "",
    required: false,
  },
  formatted_address: {
    type: String,
    default: "",
    required: false,
  },
});

const addressModel = mongoose.model("addresses", addressSchema);

module.exports = addressModel;
