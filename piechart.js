const express = require("express");
const Transaction = require("../models/Transaction");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    const transactions = await Transaction.findAll({
      where: { dateOfSale: { [Op.like]: `%-${month}-%` } },
      attributes: ["category"],
    });

    const categoryCounts = transactions.reduce((acc, { category }) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    res.json(categoryCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
