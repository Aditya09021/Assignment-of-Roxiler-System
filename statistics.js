const express = require("express");
const Transaction = require("../models/Transaction");
const { Op } = require("sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;

    const totalSale = await Transaction.sum("price", {
      where: { dateOfSale: { [Op.like]: `%-${month}-%` }, sold: true },
    });

    const totalSold = await Transaction.count({
      where: { dateOfSale: { [Op.like]: `%-${month}-%` }, sold: true },
    });

    const totalNotSold = await Transaction.count({
      where: { dateOfSale: { [Op.like]: `%-${month}-%` }, sold: false },
    });

    res.json({ totalSale: totalSale || 0, totalSold, totalNotSold });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
