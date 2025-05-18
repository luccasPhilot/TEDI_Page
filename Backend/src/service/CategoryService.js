const CategoryRepository = require('../repositories/CategoryRepository');

const createCategory = async (data) => {
    return await CategoryRepository.create(data);
};

const getAllCategories = async () => {
    return await CategoryRepository.findAll();
};

const deleteCategory = async (id) => {
    const category = await CategoryRepository.findById(id);
    if (!category) {
        throw new Error('Categoria não encontrada');
    }
    await CategoryRepository.remove(category);
};

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory
};


