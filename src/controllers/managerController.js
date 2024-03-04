const Manager = require("../models/managerModel");
const Company = require("../models/companyModel");
const Departement = require("../models/departementModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Employee = require("../models/employeeModel");

const managerController = {
  async getManager(req, res) {
    try {
      const manager = await Manager.findOne({
        where: { userId: req.user.id },
        include: {
          model: Company,
          attributes: ["name", "email", "address"],
          include: {
            model: Departement,
            attributes: ["name"],
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

  async updateManager(req, res) {
    const { name, email, password } = req.body;
    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    try {
      const manager = await Manager.findOne({
        where: { userId: req.user.id },
        include: [
          {
            model: User,
            as: "user",
          },
        ],
      });
      if (!manager) {
        return res.status(400).json({ error: "Manager not found" });
      }
      const updateData = { name, email };
      if (hashedPassword) {
        updateData.password = hashedPassword;
      }
      await manager.user.update(updateData);
      res.status(200).json(manager);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteManager(req, res) {
    try {
      const manager = await Manager.findOne({
        where: { userId: req.user.id },
        include: [
          {
            model: User,
            as: "user",
          },
        ],
      });
      if (!manager) {
        return res.status(400).json({ error: "Manager not found" });
      }
      await manager.destroy();
      await manager.user.destroy();
      res.status(200).json({ message: "Manager deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllCompany(req, res) {
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager) {
        return res.status(400).json({ error: "Manager not found" });
      }
      const company = await Company.findAll({
        where: { id: manager.companyId },
      });
      if (!company) {
        return res.status(400).json({ error: "Company not found" });
      }
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getCompanyById(req, res) {
    const { companyId } = req.params;
    try {
      const company = await Company.findOne({ where: { id: companyId } });
      if (!company) {
        return res.status(400).json({ error: "Company not found" });
      }
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async createCompany(req, res) {
    const { name, email, address } = req.body;
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager) {
        return res.status(400).json({ error: "Manager not found" });
      }
      const company = await Company.create({
        name,
        email,
        address,
        managerId: manager.id,
      });

      // Update manager with companyId if it's null
      if (!manager.companyId) {
        await manager.update({ companyId: company.id });
      }

      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateCompany(req, res) {
    const { name, email, address } = req.body;
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager) {
        return res.status(400).json({ error: "Manager not found" });
      }
      const company = await Company.findOne({
        where: { id: manager.companyId },
      });
      if (!company) {
        return res.status(400).json({ error: "Company not found" });
      }
      await company.update({ name, email, address });
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteCompany(req, res) {
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager) {
        return res.status(400).json({ error: "Manager not found" });
      }
      const company = await Company.findOne({
        where: { id: manager.companyId },
      });
      if (!company) {
        return res.status(400).json({ error: "Company not found" });
      }
      await company.destroy();
      await manager.update({ companyId: null });
      res.status(200).json({ message: "Company deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllDepartment(req, res) {
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager || !manager.companyId) {
        return res.status(400).json({
          error: "Manager not found or not associated with a company",
        });
      }
      const departments = await Departement.findAll({
        where: { companyId: manager.companyId }, // get departments associated with the manager's company
        include: {
          model: Company,
          attributes: ["name", "email", "address"],
        },
      });
      res.status(200).json(departments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getDepartmentById(req, res) {
    const { departmentId } = req.params;
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager || !manager.companyId) {
        return res.status(400).json({
          error: "Manager not found or not associated with a company",
        });
      }
      const department = await Departement.findOne({
        where: {
          id: departmentId,
          companyId: manager.companyId, // ensure the department belongs to the manager's company
        },
      });
      if (!department) {
        return res.status(400).json({
          error: "Department not found or not associated with your company",
        });
      }
      res.status(200).json(department);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async createDepartment(req, res) {
    const { name } = req.body;
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager || !manager.companyId) {
        return res.status(400).json({
          error: "Manager not found or not associated with a company",
        });
      }
      const department = await Departement.create({
        name,
        companyId: manager.companyId, // associate the department with the manager's company
      });

      res.status(201).json(department);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateDepartment(req, res) {
    const { name } = req.body;
    const { departmentId } = req.params;
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager || !manager.companyId) {
        return res.status(400).json({
          error: "Manager not found or not associated with a company",
        });
      }
      const department = await Departement.findOne({
        where: {
          id: departmentId,
          companyId: manager.companyId, // ensure the department belongs to the manager's company
        },
      });
      if (!department) {
        return res.status(400).json({
          error: "Department not found or not associated with your company",
        });
      }
      await department.update({ name });
      res.status(200).json(department);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteDepartment(req, res) {
    const { departmentId } = req.params;
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager || !manager.companyId) {
        return res.status(400).json({
          error: "Manager not found or not associated with a company",
        });
      }
      const department = await Departement.findOne({
        where: {
          id: departmentId,
          companyId: manager.companyId, // ensure the department belongs to the manager's company
        },
      });
      if (!department) {
        return res.status(400).json({
          error: "Department not found or not associated with your company",
        });
      }
      await department.destroy();
      res.status(200).json({ message: "Department deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllEmployee(req, res) {
    try {
      const manager = await Manager.findOne({ where: { userId: req.user.id } });
      if (!manager || !manager.companyId) {
        return res.status(400).json({
          error: "Manager not found or not associated with a company",
        });
      }
      const employees = await Employee.findAll({
        where: { companyId: manager.companyId },
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Company,
            attributes: ["name", "email", "address"],
          },
          {
            model: Departement,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(employees);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = managerController;
