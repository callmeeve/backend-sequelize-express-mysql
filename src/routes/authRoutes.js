const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// router.post("/register/admin", authController.registerAdmin);
// router.post("/register/manager", authController.registerManager);
// router.post("/register/employee", authController.registerEmployee);
// router.post("/login/admin", authController.loginAdmin);
// router.post("/login/manager", authController.loginManager);
// router.post("/login/employee", authController.loginEmployee);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;