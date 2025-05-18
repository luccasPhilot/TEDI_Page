const MonitorService = require('../service/MonitorService');

const createMonitor = async (req, res) => {
    try {
        const newData = req.body;
        const monitor = await MonitorService.createMonitor(newData);
        return res.status(200).json(monitor);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getAllMonitors = async (req, res) => {
    try {
        const {search} = req.query;
        const monitors = await MonitorService.getAllMonitors(search);
        return res.status(200).json(monitors);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getMonitorById = async (req, res) => {
    try {
        const { id } = req.params;
        const monitor = await MonitorService.getMonitorById(id);
        return res.status(200).json(monitor);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const deleteMonitor = async (req, res) => {
    try {
        const { id } = req.params;
        await MonitorService.deleteMonitor(id);
        return res.status(200).json({message: 'Monitor deletado'});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createMonitor,
    getAllMonitors,
    getMonitorById,
    deleteMonitor
};
