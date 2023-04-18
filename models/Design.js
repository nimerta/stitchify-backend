const mongoose = require("mongoose");

const designSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
    default: "",
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  tailor: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "tailors",
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  },
  design_for: {
    type: String,
    required: false,
    default: "",
  },
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
});

var designModel = mongoose.model("designs", designSchema);

module.exports = designModel;
