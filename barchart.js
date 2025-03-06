const express = require("express");
const Transaction = require("../models/Transaction");
const { Op } = require("sequelize");

const router = express.Router();

const priceRanges = [
  [0, 100], [101, 200], [201, 300], [301, 400], [401, 500],
  [501, 600], [601, 700], [701, 800], [801, 900], [901, Infinity],
];

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    const whereClause = { dateOfSale: { [Op.like]: `%-${month}-%` } };

    const counts = await Promise.all(
      priceRanges.map(async ([min, max]) => {
        return {
          range: `${min}-${max === Infinity ? "above" : max}`,
          count: await Transaction.count({
            where: { ...whereClause, price: { [Op.between]: [min, max] } },
          }),
        };
      })
    );

    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
