const express = require("express");
const Item = require("../models/items");
const auth = require("../middleware/auth");
const router = new express.Router();

// create new item
router.post("/items", async (req, res) => {
  let item = new Item(req.body);
  try {
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get item details
router.get("/item/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const item = await Item.findOne({ _id });
    if (!item) {
      return res.status(400).send({ error: "Id not found" });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// update item
router.patch("/inventory/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "price"];
  const isAllowed = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isAllowed) {
    return res.status(400).send({ error: "Field doesn't eexist" });
  }
  try {
    const item = await Item.findOne({
      _id: req.params.id,
    });
    if (!item) {
      return res.status(400).send({ error: "Id not found" });
    }
    updates.forEach((update) => {
      item[update] = req.body[update];
    });
    await item.save();
    res.send(item);
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete item
router.delete("/item/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const item = await Item.findOneAndDelete({
      _id,
    });
    if (!item) {
      return res.status(400).send({ error: "Id not found" });
    }
    res.send(item);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
