const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email_address: {
    type: String,
    required: true,
    default: "",
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
  full_name: {
    type: String,
    required: true,
    default: "",
  },
  phone_no: {
    type: String,
    required: true,
    default: "",
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  gender: {
    type: String,
    required: true,
    default: "",
  },
  total_orders: {
    type: Number,
    required: true,
    default: 0,
  },
  // standard_orders: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "standard_orders",
  //     required: false,
  //     default: [],
  //   },
  // ],
  image: {
    url: {
      type: String,
      required: false,
      default: "",
    },
    public_id: {
      type: String,
      required: false,
      default: "",
    },
  },
  measurement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "measurements",
    required: false,
  },
  custom_orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "custom_orders",
      required: false,
      default: [],
    },
  ],
  cart: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "designs" },
      quantity: { type: Number, default: 1 },
      tailor: { type: mongoose.Schema.Types.ObjectId, ref: "tailors" },
    },
  ],
});

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;
