const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/CategoriesController');

router.post('/', categoriesController.createCategory);

router.get('/', categoriesController.getAllCategories);

router.patch('/:id', categoriesController.deleteCategory);

module.exports = router;
