const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, "", {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
});

module.exports = db;
