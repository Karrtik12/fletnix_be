const express = require("express");
const User = require("../models/Users");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name, age } = req.body;
  try {
    const user = new User({ email, password, name, age });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).send("Invalid email or password");
    }
    res.send("Login successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
