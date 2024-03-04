const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Manager = require("../models/managerModel");
const crypto = require("crypto");

const authController = {
  // async registerAdmin(req, res) {
  //   const { username, email, password } = req.body;
  //   try {
  //     const user = await User.create({
  //       username,
  //       email,
  //       password: bcrypt.hashSync(password, 8),
  //       role: "admin",
  //     });
  //     res.status(201).json(user);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  // async registerManager(req, res) {
  //   const { username, email, password } = req.body;
  //   const secret_key = crypto.randomBytes(20).toString("hex");
  //   try {
  //     let user = await User.findOne({ where: { email } });
  //     if (user) {
  //       return res.status(400).json({ error: "Email already exists" });
  //     }
  //     user = await User.create({
  //       username,
  //       email,
  //       password: bcrypt.hashSync(password, 8),
  //       role: "manager",
  //     });
  //     const manager = await Manager.create({
  //       userId: user.id,
  //       secret_key,
  //     });
  //     res.status(201).json(manager);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  // async registerEmployee(req, res) {
  //   const { username, email, password } = req.body;
  //   try {
  //     const user = await User.create({
  //       username,
  //       email,
  //       password: bcrypt.hashSync(password, 8),
  //       role: "employee",
  //     });
  //     res.status(201).json(user);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  async register(req, res) {
    const { username, email, password, role } = req.body;
    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }
      user = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        role,
      });
  
      switch (role) {
        case "admin":
          res.status(201).json(user);
          break;
        case "manager":
          const secret_key = crypto.randomBytes(20).toString("hex");
          const manager = await Manager.create({
            userId: user.id,
            secret_key,
          });
          res.status(201).json(manager);
          break;
        case "employee":
          res.status(201).json(user);
          break;
        default:
          res.status(400).json({ error: "Invalid role" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // async loginAdmin(req, res) {
  //   const { email, password } = req.body;
  //   try {
  //     const user = await User.findOne({ where: { email, role: "admin" } });
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       const token = jwt.sign(
  //         {
  //           id: user.id,
  //           role: user.role,
  //           email: user.email,
  //           username: user.username,
  //         },
  //         process.env.SECRET,
  //         {
  //           expiresIn: 86400,
  //         }
  //       );

  //       req.session.token = token;

  //       res.status(200).json({ token, role: user.role });
  //     } else {
  //       res.status(401).json({ error: "Invalid email or password" });
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  // async loginManager(req, res) {
  //   const { email, password } = req.body;
  //   try {
  //     const user = await User.findOne({ where: { email, role: "manager" } });
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       const token = jwt.sign(
  //         {
  //           id: user.id,
  //           role: user.role,
  //           email: user.email,
  //           username: user.username,
  //         },
  //         process.env.SECRET,
  //         {
  //           expiresIn: 86400,
  //         }
  //       );

  //       req.session.token = token;

  //       res.status(200).json({ token, role: user.role });
  //     } else {
  //       res.status(401).json({ error: "Invalid email or password" });
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  // async loginEmployee(req, res) {
  //   const { email, password } = req.body;
  //   try {
  //     const user = await User.findOne({ where: { email, role: "employee" } });
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       const token = jwt.sign(
  //         {
  //           id: user.id,
  //           role: user.role,
  //           email: user.email,
  //           username: user.username,
  //         },
  //         process.env.SECRET,
  //         {
  //           expiresIn: 86400,
  //         }
  //       );

  //       req.session.token = token;

  //       res.status(200).json({ token, role: user.role });
  //     } else {
  //       res.status(401).json({ error: "Invalid email or password" });
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            role: user.role,
            email: user.email,
            username: user.username,
          },
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
