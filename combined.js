const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    const [statistics, barChart, pieChart] = await Promise.all([
      axios.get(`http://localhost:5000/statistics?month=${month}`),
      axios.get(`http://localhost:5000/barchart?month=${month}`),
      axios.get(`http://localhost:5000/piechart?month=${month}`),
    ]);

    res.json({
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
