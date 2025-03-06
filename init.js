const express = require("express");
const axios = require("axios");
const Transaction = require("../models/Transaction");
const router = express.Router();

// ✅ Route to Fetch & Store Data
router.get("/initialize-db", async (req, res) => {
  try {
    const apiUrl = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    const { data } = await axios.get(apiUrl);

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    // ✅ Store data in the database
    await Transaction.bulkCreate(data, { ignoreDuplicates: true });

    res.json({ message: "Database initialized successfully!" });
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
