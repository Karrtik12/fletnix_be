const express = require("express");
const Title = require("../models/Title");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let titles, totalTitles, totalPages;
    const page = parseInt(req.query.page) || 1;
    const type = req.query.type;
    const userAge = parseInt(req.query.age) || 17;
    const limit = 15;
    if (userAge >= 18) {
      titles = await Title.find({ type: new RegExp(type, "i") })
        .skip((page - 1) * limit)
        .limit(limit);

      totalTitles = await Title.countDocuments({
        type: new RegExp(type, "i"),
      });
    } else {
      titles = await Title.find({
        type: new RegExp(type, "i"),
        rating: { $ne: "R" },
      })
        .skip((page - 1) * limit)
        .limit(limit);

      totalTitles = await Title.countDocuments({
        type: new RegExp(type, "i"),
        rating: { $ne: "R" },
      });
    }
    totalPages = Math.ceil(totalTitles / limit);
    res.json({ page, totalPages, count: titles.length, titles });
  } catch (error) {
    console.log({ errorr: error.message });
    res.status(500).send(error.message);
  }
});

router.get("/search", async (req, res) => {
  try {
    const userAge = parseInt(req.query.age) || 17;
    const type = req.query.type;
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    let titles, totalPages;
    if (userAge >= 18) {
      titles = await Title.find({
        $or: [
          { title: new RegExp(query, "i"), type: new RegExp(type, "i") },
          { cast: new RegExp(query, "i"), type: new RegExp(type, "i") },
        ],
      })
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      titles = await Title.find({
        $or: [
          {
            title: new RegExp(query, "i"),
            rating: { $ne: "R" },
            type: new RegExp(type, "i"),
          },
          {
            cast: new RegExp(query, "i"),
            rating: { $ne: "R" },
            type: new RegExp(type, "i"),
          },
        ],
      })
        .skip((page - 1) * limit)
        .limit(limit);
    }
    res.json({ query, count: titles.length, titles });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const show = await Title.findOne({ show_id: req.params.id });
  res.json(show);
});

module.exports = router;
