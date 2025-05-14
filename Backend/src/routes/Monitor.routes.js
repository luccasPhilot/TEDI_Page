const express = require('express');
const router = express.Router();
const monitorController = require('../controller/monitorController');

router.post('/', monitorController.createMonitor);

router.get('/', monitorController.getAllMonitors);
router.get('/:id', monitorController.getMonitorById);

router.delete('/:id', monitorController.deleteMonitor);

module.exports = router;
