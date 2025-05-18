const express = require('express');
const router = express.Router();
const newsController = require('../controller/NewsController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/', authMiddleware, newsController.createNews);

router.get('/', newsController.getAllNews);
router.get('/latest', newsController.getLatestNews);
router.get('/:id', newsController.getNewsById);

router.put('/:id', authMiddleware, newsController.updateNews);

router.delete('/:id', authMiddleware, newsController.deleteNews);

module.exports = router;
