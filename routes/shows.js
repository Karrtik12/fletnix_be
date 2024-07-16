const express = require("express");
const Show = require("../models/Show");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let titles;
    const page = parseInt(req.query.page) || 1;
    const type = req.query.type;
    const userAge = parseInt(req.query.age) || 17;
    const limit = 15;
    if (userAge >= 18) {
      titles = await Show.find({ type: new RegExp(type, "i") })
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      titles = await Show.find({
        type: new RegExp(type, "i"),
        rating: { $ne: "R" },
      })
        .skip((page - 1) * limit)
        .limit(limit);
    }
    res.json(titles);
  } catch (error) {
    console.log({ errorr: error.message });
    res.status(500).send(error.message);
  }
});

router.get("/search", async (req, res) => {
  try {
    const userAge = parseInt(req.query.age) || 17;
    const query = req.query.q;
    let titles;
    if (userAge >= 18) {
      titles = await Show.find({
        $or: [
          { title: new RegExp(query, "i") },
          { cast: new RegExp(query, "i") },
        ],
      })
        .skip((page - 1) * limit)
        .limit(limit);
      res.json(titles);
    } else {
      titles = await Show.find({
        $or: [
          { title: new RegExp(query, "i"), rating: { $ne: "R" } },
          { cast: new RegExp(query, "i"), rating: { $ne: "R" } },
        ],
      })
        .skip((page - 1) * limit)
        .limit(limit);
      res.json(titles);
    }
    res.json(titles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const show = await Show.findOne({ show_id: req.params.id });
  res.json(show);
});

module.exports = router;
