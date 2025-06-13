const express = require("express");
const router = express.Router();
const monitorController = require("../controller/MonitorController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", monitorController.createMonitor);

router.get("/", authMiddleware, monitorController.getAllMonitors);
router.get("/:id", authMiddleware, monitorController.getMonitorById);

router.delete("/:id", authMiddleware, monitorController.deleteMonitor);

module.exports = router;
