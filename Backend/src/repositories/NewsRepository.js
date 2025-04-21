const News = require('../models/News');
const {generateRandomId} = require('../utils/RandonId');

const create = async (data) => {
    const id = generateRandomId();
    const newData = {...data, id};
    return await News.create(newData);
};

const findAll = async () => {
    return await News.findAll();
};

const findById = async (id) => {
    return await News.findByPk(id);
};

const update = async (news, data) => {
    return await news.update(data);
};

const remove = async (news) => {
    return await news.destroy();
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};
