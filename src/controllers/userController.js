const User = require("../models/userModel");
const Task = require("../models/taskModel");
const upload = require("../middlewares/multer");

const userController = {
  async updateUser(req, res) {
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
        await user.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async createTask(req, res) {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      try {
        const task = await Task.create({
          ...req.body,
          file: req.file ? req.file.path : null, // add the file path to the data
          id_user: req.user.id,
        });

        res.status(201).json(task);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  },

  async getTask(req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateTask(req, res) {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (task) {
        const updatedTask = await task.update(req.body);
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteTask(req, res) {
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
  },
};

module.exports = userController;
