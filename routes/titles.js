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
    const matchCondition = {
      type: new RegExp(type, "i"),
      ...(userAge < 18 && { rating: { $ne: "R" } }),
    };
    const aggregationPipeline = [
      { $match: matchCondition },
      {
        $addFields: {
          date_added: {
            $convert: {
              input: "$date_added",
              to: "date",
              onError: new Date(0),
              onNull: new Date(0),
            },
          },
        },
      },
      { $sort: { date_added: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];
    titles = await Title.aggregate(aggregationPipeline);
    totalTitles = await Title.countDocuments(matchCondition);
    totalPages = Math.ceil(totalTitles / limit);
    res.json({ page, totalPages, count: titles.length, titles });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

router.get("/search", async (req, res) => {
  try {
    const limit = 15;
    const userAge = parseInt(req.query.age) || 17;
    const type = req.query.type;
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    let titles, totalTitles, totalPages;
    const matchCondition = {
      $or: [
        { title: new RegExp(query, "i"), type: new RegExp(type, "i") },
        { cast: new RegExp(query, "i"), type: new RegExp(type, "i") },
      ],
      ...(userAge < 18 && { rating: { $ne: "R" } }),
    };
    const aggregationPipeline = [
      { $match: matchCondition },
      {
        $addFields: {
          date_added: {
            $convert: {
              input: "$date_added",
              to: "date",
              onError: new Date(0),
              onNull: new Date(0),
            },
          },
        },
      },
      { $sort: { date_added: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];
    titles = await Title.aggregate(aggregationPipeline);
    totalTitles = await Title.countDocuments(matchCondition);
    totalPages = Math.ceil(totalTitles / limit);
    res.json({ page, totalPages, count: titles.length, titles });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const show = await Title.findOne({ show_id: req.params.id });
  res.json(show);
});

module.exports = router;
