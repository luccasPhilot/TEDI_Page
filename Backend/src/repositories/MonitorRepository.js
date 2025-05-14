const Monitor = require('../models/Monitor');
const {generateRandomId} = require('../utils/RandonId');
const {Op} = require('sequelize');

const create = async (data) => {
    const id = generateRandomId();
    const newData = {...data, id};
    return await Monitor.create(newData);
};

const findAll = async (search) => {
    const where = search ? {
        [Op.or]: [
            {name: {[Op.like]: `%${search}%` }},
            {email: {[Op.like]: `%${search}%` }},
            {ra: {[Op.like]: `%${search}%` }},
          ]
        } : {};
    return await Monitor.findAll({
        attributes: ['id', 'name', 'ra', 'email'],
        where
    });
};

const findById = async (id) => {
    return await Monitor.findByPk(id);
};

const remove = async (monitor) => {
    return await monitor.destroy();
};

module.exports = {
    create,
    findAll,
    findById,
    remove
};
