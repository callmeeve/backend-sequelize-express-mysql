const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authController = {
  async register(req, res) {
    const { username, email, password, role } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.SECRET,
          {
            expiresIn: 86400,
          }
        );

        req.session.token = token;

        res.status(200).json({ token, role: user.role });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = authController;
