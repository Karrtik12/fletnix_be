const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, age } = req.body;
  try {
    const user = new User({ email, password, age });
    await user.save();
    res.status(201).json({ created: true, message: "User registered" });
  } catch (error) {
    if (error.message.includes("duplicate"))
      res.status(200).json({ created: false, message: "User already exists" });
    else res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        email: "",
        age: 0,
        message: "User doesn't exist. Please register",
      });
    } else if (user.password !== password) {
      return res
        .status(200)
        .json({ email: "", age: 0, message: "Incorrect password" });
    }
    res.status(200).json({
      email: user.email,
      age: user.age,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
