const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authJwt = require('../middlewares/authJwt');

router.get('/', authJwt.verifyToken, authJwt.isEmployee, employeeController.getEmployee);
router.post('/', authJwt.verifyToken, authJwt.isEmployee, employeeController.createEmployee);

module.exports = router;