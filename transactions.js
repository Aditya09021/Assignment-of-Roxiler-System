const { DataTypes } = require("sequelize");
const sequelize = require("./config/db");

const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  sold: { type: DataTypes.BOOLEAN, allowNull: false },
  dateOfSale: { type: DataTypes.DATEONLY, allowNull: false },
});

module.exports = Transaction;
