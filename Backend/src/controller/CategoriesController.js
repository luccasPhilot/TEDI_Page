const CategoryService = require('../service/CategoryService');

const createCategory = async (req, res) => {
    try {
        const newData = req.body;
        const category = await CategoryService.createCategory(newData);
        return res.status(200).json(category);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryService.deleteCategory(id);
        return res.status(200).json({message: 'Categoria deletada'});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory
};
