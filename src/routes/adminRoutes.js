const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authJwt = require('../middlewares/authJwt');

// Delete a user
router.delete('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], adminController.deleteUser);
router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], adminController.getAllUsers);
router.get('/tasks', [authJwt.verifyToken, authJwt.isAdmin], adminController.getAllTasks);

module.exports = router;