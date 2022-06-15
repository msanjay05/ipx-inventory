const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    Orders: [
      {
        items: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Items",
        },
      },
    ],
    status: {
      type: String,
      default: "inTransit",
    },
  },
  {
    timestamps: true,
  }
);
const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
