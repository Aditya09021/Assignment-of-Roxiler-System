const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const Transaction = require("./models/Transaction");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API Route to fetch transactions
app.get("/transactions", async (req, res) => {
  try {
    const { month, page = 1, search = "" } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required!" });
    }

    const transactions = await Transaction.findAll({
      where: sequelize.where(sequelize.fn("MONTHNAME", sequelize.col("dateOfSale")), month),
      limit: 10, // Adjust based on pagination
      offset: (page - 1) * 10,
    });

    res.json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Check if the server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
