const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sp", "root", "Aditya@129", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
