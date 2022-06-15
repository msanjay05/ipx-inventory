const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

// create user or signup
router.post("/users", async (req, res) => {
  let user = new User(req.body);
  try {
    await user.save();
    // console.log(user);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
    console.log(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).send({ error: "please login first" });
  }
});

// logout from all device
router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: "logged out successfully" });
  } catch (e) {
    res.status(500).send({ error: "please login first" });
  }
});

// login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.phoneNo,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: "password or phoneNo is wrong" });
  }
});

// get user details
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// update user
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "phoneNo", "password"];
  const isAllowed = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isAllowed) {
    return res
      .status(400)
      .send({ error: "Fields you are trying to update can't be updated" });
  }
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    // sendAccountDeleteEmail(req.user.email,req.user.name)
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
