const express = require("express");
const router = express.Router();
const categoriesController = require("../controller/CategoriesController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, categoriesController.createCategory);

router.get("/", categoriesController.getAllCategories);

router.patch("/:id", authMiddleware, categoriesController.deleteCategory);

module.exports = router;
