const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", itemsSchema);

module.exports = Item;
