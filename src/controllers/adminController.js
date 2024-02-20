const User = require("../models/userModel");
const Task = require("../models/taskModel");

const adminController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({ where: { role: "user" } });
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateAdmin(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        const updatedUser = await user.update(req.body);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        if (user.role !== "user") {
          return res.status(403).json({ error: "Only users can be deleted." });
        }
        await user.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllTasks (req, res) {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteTask (req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (task) {
        await task.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = adminController;
