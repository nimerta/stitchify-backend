const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    tailor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tailors",
      default: null,
    },
    amount: {
      type: Number,
      required: [true, "Please enter the price"],
      default: 0,
    },
    is_accepted: {
      type: Boolean,
      default: false,
      required: false,
    },
    offer_status: {
      type: String,
      enum: ["placed", "accepted", "rejected"],
      default: "placed",
    },
  },
  {
    timestamps: true,
  }
);

const offerModel = mongoose.model("Offer", offerSchema);

module.exports = offerModel;
