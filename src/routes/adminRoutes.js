const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authJwt = require('../middlewares/authJwt');

router.get('/', authJwt.verifyToken, authJwt.isAdmin, adminController.getAdmin);
router.put('/', authJwt.verifyToken, authJwt.isAdmin, adminController.updateAdmin);

router.get('/manager', authJwt.verifyToken, authJwt.isAdmin, adminController.getAllManager);
router.get('/manager/:id', authJwt.verifyToken, authJwt.isAdmin, adminController.getManagerById);

module.exports = router;