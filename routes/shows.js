const express = require("express");
const Show = require("../models/Show");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const type = req.query.type;
  const limit = 15;
  const shows = await Show.find({ type: new RegExp(type, "i") })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json(shows);
});

router.get("/search", async (req, res) => {
  const query = req.query.q;
  const shows = await Show.find({
    $or: [{ title: new RegExp(query, "i") }, { cast: new RegExp(query, "i") }],
  });
  res.json(shows);
});

router.get("/:id", async (req, res) => {
  const show = await Show.findOne({ show_id: req.params.id });
  res.json(show);
});

module.exports = router;
