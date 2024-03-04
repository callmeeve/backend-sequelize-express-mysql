const Sequelize = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

const Manager = db.define("managers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  secret_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "companies",
      key: "id",
    },
  },
});

module.exports = Manager;