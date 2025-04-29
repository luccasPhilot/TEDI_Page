const express = require('express');
const router = express.Router();
const contactController = require('../controller/ContactController');

router.post('/', contactController.sendEmail);

module.exports = router;
