const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
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
    images: [
      {
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
    payment_status: {
      type: String,
      required: false,
      default: "NOT-PAID",
    },
    payment_method: {
      type: String,
      required: false,
      default: "",
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
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],

    accepted_offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: false,
      default: null,
    },
    fabric: {
      type: String,
      required: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      default: "",
    },
    instructions: {
      type: String,
      required: false,
      default: "",
    },
    order_area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Areas",
      default: null,
    },
  },
  { timestamps: true }
);

const customOrderModel = mongoose.model("CustomerOrder", customOrderSchema);

module.exports = customOrderModel;
