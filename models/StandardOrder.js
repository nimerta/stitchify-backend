const mongoose = require("mongoose");

const standardOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    tailor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tailors",
      default: null,
    },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "designs" },
        quantity: { type: Number, required: true },
      },
    ],
    completed: { type: Boolean, default: false },
    order_status: {
      type: String,
      required: false,
      default: "PLACED",
    },
    total_amount: {
      type: Number,
      required: true,
    },
    sub_total: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: false,
      default: "NOT-PAID",
    },
    order_type: {
      type: String,
      required: false,
      default: "",
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      default: null,
    },
  },
  { timestamps: true }
);

const standardOrderModel = mongoose.model(
  "standard_orders",
  standardOrderSchema
);

module.exports = standardOrderModel;
