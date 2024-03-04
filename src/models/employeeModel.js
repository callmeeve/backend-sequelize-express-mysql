const Sequelize = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

const Employee = db.define("employees", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birth_date : {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gender : {
        type: DataTypes.ENUM("Laki-laki", "Perempuan"),
        allowNull: false,
    },
    job_status : {
        type: DataTypes.ENUM("Tetap", "Kontrak", "Proyek"),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: "users",
        key: "id",
        },
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: "companies",
        key: "id",
        },
    },
    departementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: "departements",
        key: "id",
        },
    },
    managerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: "managers",
        key: "id",
        },
    },
});

module.exports = Employee;