const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authJwt = require('../middlewares/authJwt');

router.put('/:id', [authJwt.verifyToken, authJwt.isUser], userController.updateUser);
router.delete('/:id', [authJwt.verifyToken, authJwt.isUser], userController.deleteUser);
router.post('/tasks', [authJwt.verifyToken, authJwt.isUser], userController.createTask);
router.get('/tasks/:id', [authJwt.verifyToken, authJwt.isUser], userController.getTask);
router.put('/tasks/:id', [authJwt.verifyToken, authJwt.isUser], userController.updateTask);
router.delete('/tasks/:id', [authJwt.verifyToken, authJwt.isUser], userController.deleteTask);

module.exports = router;