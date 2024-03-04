const express = require("express");
const router = express.Router();
const authJwt = require("../middlewares/authJwt");

const managerController = require("../controllers/managerController");

router.get("/", authJwt.verifyToken, authJwt.isManager, managerController.getManager);
router.put("/", authJwt.verifyToken, authJwt.isManager, managerController.updateManager);
router.delete("/", authJwt.verifyToken, authJwt.isManager, managerController.deleteManager);

router.get("/company", authJwt.verifyToken, authJwt.isManager, managerController.getAllCompany);
router.get("/company/:id", authJwt.verifyToken, authJwt.isManager, managerController.getCompanyById);
router.post("/company", authJwt.verifyToken, authJwt.isManager, managerController.createCompany);
router.put("/company/:id", authJwt.verifyToken, authJwt.isManager, managerController.updateCompany);
router.delete("/company/:id", authJwt.verifyToken, authJwt.isManager, managerController.deleteCompany);

router.get("/department", authJwt.verifyToken, authJwt.isManager, managerController.getAllDepartment);
router.get("/department/:id", authJwt.verifyToken, authJwt.isManager, managerController.getDepartmentById);
router.post("/department", authJwt.verifyToken, authJwt.isManager, managerController.createDepartment);
router.put("/department/:id", authJwt.verifyToken, authJwt.isManager, managerController.updateDepartment);
router.delete("/department/:id", authJwt.verifyToken, authJwt.isManager, managerController.deleteDepartment);

router.get("/employee", authJwt.verifyToken, authJwt.isManager, managerController.getAllEmployee);



module.exports = router;