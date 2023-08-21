const mongoose = require("mongoose");

const tailorSchema = mongoose.Schema({
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
  // standard_orders: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "standard_orders",
  //     required: false,
  //     default: [],
  //   },
  // ],

  gender: {
    type: String,
    required: true,
    default: "",
  },
  address: {
    type: String,
    required: true,
    default: "",
  },
  phone_no: {
    type: String,
    required: true,
    default: "",
  },
  total_orders: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: false,
    default: "",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
      required: false,
      default: [],
    },
  ],
  custom_orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "custom_orders",
      required: false,
      default: [],
    },
  ],
  main_area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Areas",
    default: null,
  },
  city: {
    type: String,
    required: false,
    default: "",
  },
});

var tailorModel = mongoose.model("tailors", tailorSchema);

module.exports = tailorModel;
