const NewsCategory = require('../models/NewsCategory');
const {generateRandomId} = require('../utils/RandonId');

const create = async (data) => {
    const id = generateRandomId();
    const newData = {...data, id};
    return await NewsCategory.create(newData);
};

const findAll = async () => {
    return await NewsCategory.findAll();
};

const findById = async (id) => {
    return await NewsCategory.findByPk(id);
};

const remove = async (category) => {
    await category.update({removed: true});
};

module.exports = {
    create,
    findAll,
    findById,
    remove
};
