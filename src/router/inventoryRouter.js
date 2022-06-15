const express = require("express");
const auth = require("../middleware/auth");
const Inventory = require("../models/inventory");
const router = new express.Router();

// create inventory
router.post("/inventory", auth, async (req, res) => {
  const inventory = new Inventory({
    ...req.body,
  });
  try {
    await inventory.save();
    res.status(201).send(inventory);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/inventory/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const inventory = await Inventory.findOne({ _id });
    if (!inventory) {
      return res.status(400).send({ error: "Id not found" });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/inventory/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["order", "status"];
  const isAllowed = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isAllowed) {
    return res.status(400).send({ error: "Field doesn't eexist" });
  }
  try {
    const inventory = await Inventory.findOne({
      _id: req.params.id,
    });
    if (!item) {
      return res.status(400).send({ error: "Id not found" });
    }
    updates.forEach((update) => {
      inventory[update] = req.body[update];
    });
    await inventory.save();
    res.send(inventory);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/inventory/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const inventory = await Inventory.findOneAndDelete({
      _id,
    });
    if (!inventory) {
      return res.status(400).send({ error: "Id not found" });
    }
    res.send(inventory);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
