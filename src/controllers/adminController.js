const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Manager = require("../models/managerModel");
const Company = require("../models/companyModel");
const Departement = require("../models/departementModel");

const adminController = {
  async getAdmin(req, res) {
    try {
      const admin = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["password"] },
      });
      if (!admin) {
        return res.status(400).json({ error: "Admin not found" });
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateAdmin(req, res) {
    const { username, email, password } = req.body;
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    try {
      const admin = await User.findOne({
        where: { id: req.user.id },
      });
      if (!admin) {
        return res.status(400).json({ error: "Admin not found" });
      }
      const updateData = { username, email };
      if (hashedPassword) {
        updateData.password = hashedPassword;
      }
      await admin.update(updateData);
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllManager(req, res) {
    try {
      const admin = await User.findOne({
        where: { id: req.user.id, role: "admin" },
      });
      if (!admin) {
        return res.status(400).json({ error: "Admin not found" });
      }
      const managers = await User.findAll({
        where: { role: "manager" },
        include: {
          model: Manager,
          attributes: ["secret_key", "companyId"],
          include: {
            model: Company,
            attributes: ["name", "email", "address"],
            include: {
              model: Departement,
              attributes: ["id", "name"],
            },
          },
        },
      });
      if (managers.length === 0) {
        return res.status(400).json({ error: "No manager found" });
      }
      res.status(200).json(managers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getManagerById(req, res) {
    try {
      const manager = await User.findOne({
        where: { id: req.params.id, role: "manager" },
        include: {
          model: Manager,
          attributes: ["secret_key", "companyId"], // add any other Manager attributes you want to include
          include: {
            model: Company,
            attributes: ["name", "email", "address"],
            include: {
              model: Departement,
              attributes: ["id", "name"],
            },
          },
        },
      });
      if (!manager) {
        return res.status(400).json({ error: "Manager not found" });
      }
      res.status(200).json(manager);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = adminController;
