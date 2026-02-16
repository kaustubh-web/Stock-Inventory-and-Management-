const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    type: {
      type: String,
      enum: ["IN", "OUT"],
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    note: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movement", movementSchema);
