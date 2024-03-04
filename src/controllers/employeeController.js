const Company = require("../models/companyModel");
const Departement = require("../models/departementModel");
const Employee = require("../models/employeeModel");
const Manager = require("../models/managerModel");
const User = require("../models/userModel");

const employeeController = {
  async getEmployee(req, res) {
    try {
      const employee = await Employee.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Company,
            attributes: ["name", "email", "address"],
          },
          {
            model: Departement,
            attributes: ["name"],
          },
          {
            model: Manager,
            include: {
              model: User,
              attributes: ["username", "email"],
            },
          },
        ],
      });
      if (!employee) {
        return res.status(400).json({ error: "Employee not found" });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async createEmployee(req, res) {
    const {
      name,
      address,
      birth_date,
      gender,
      job_status,
      phone,
      companyId,
      departementId,
    } = req.body;
    try {
      const manager = await Manager.findOne({ where: { companyId } });
      if (!manager) {
        return res
          .status(400)
          .json({ error: "No manager found for the provided company" });
      }
      const employee = await Employee.create({
        name,
        address,
        birth_date,
        gender,
        job_status,
        phone,
        userId: req.user.id, // assuming the logged-in user is the employee
        companyId,
        departementId,
        managerId: manager.id,
      });
      res.status(200).json(employee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = employeeController;
