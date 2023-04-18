const mongoose = require("mongoose");

const measurementSchema = mongoose.Schema({
  bust: {
    type: Number,
    required: false,
    default: 0,
  },
  waist: {
    type: Number,
    required: false,
    default: 0,
  },
  shoulder: {
    type: Number,
    required: false,
    default: 0,
  },
  sleeve_length: {
    type: Number,
    required: false,
    default: 0,
  },
  shirt_length: {
    type: Number,
    required: false,
    default: 0,
  },
  shirt_bottom: {
    type: Number,
    required: false,
    default: 0,
  },
  hip: {
    type: Number,
    required: false,
    default: 0,
  },
  trouser_length: {
    type: Number,
    required: false,
    default: 0,
  },
  trouser_waist: {
    type: Number,
    required: false,
    default: 0,
  },
  trouser_hip: {
    type: Number,
    required: false,
    default: 0,
  },
  trouser_rise: {
    type: Number,
    required: false,
    default: 0,
  },
  inseam: {
    type: Number,
    required: false,
    default: 0,
  },
  thigh: {
    type: Number,
    required: false,
    default: 0,
  },
  leg_opening: {
    type: Number,
    required: false,
    default: 0,
  },
});

var measurementModel = mongoose.model("measurements", measurementSchema);

module.exports = measurementModel;
