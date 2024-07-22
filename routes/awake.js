const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ OK: true });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

module.exports = router;
