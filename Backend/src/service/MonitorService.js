const MonitorRepository = require('../repositories/MonitorRepository');

const createMonitor = async (data) => {
    return await MonitorRepository.create(data);
};

const getMonitorById = async (id) => {
    const monitor = await MonitorRepository.findById(id);
    if (!monitor) {
        throw new Error('Monitor não encontrado');
    }
    return monitor;
};

const getAllMonitors = async (search) => {
    return await MonitorRepository.findAll(search);
};


const deleteMonitor = async (id) => {
    const monitor = await MonitorRepository.findById(id);
    if (!monitor) {
        throw new Error('Monitor não encontrado');
    }
    await MonitorRepository.remove(monitor);
};

module.exports = {
    createMonitor,
    getMonitorById,
    getAllMonitors,
    deleteMonitor
};


