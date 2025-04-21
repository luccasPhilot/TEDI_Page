const express = require('express');
const router = express.Router();
const userController = require('../controller/UsersController');

router.get('/:id', userController.getUserById);

module.exports = router;
