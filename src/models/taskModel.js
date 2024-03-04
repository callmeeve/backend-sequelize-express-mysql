const Sequelize = require("sequelize");
const db = require("../config/database");
const User = require("./userModel");

const { DataTypes } = Sequelize;

const Task = db.define(
  "tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ongoing", "completed"),
      defaultValue: "ongoing",
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
);

module.exports = Task;