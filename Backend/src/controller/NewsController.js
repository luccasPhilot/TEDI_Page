const NewsService = require('../service/NewsService');

const createNews = async (req, res) => {
    try {
        const newData = req.body;
        const news = await NewsService.createNews(newData);
        return res.status(200).json(news);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getAllNews = async (req, res) => {
    try {
        const news = await NewsService.getAllNews();
        return res.status(200).json(news);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getLatestNews = async (req, res) => {
    try {
        const news = await NewsService.getLatestNews();
        return res.status(200).json(news);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await NewsService.getNewsById(id);
        return res.status(200).json(news);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const news = await NewsService.updateNews(id, updateData);
        return res.status(200).json(news);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await NewsService.deleteNews(id);
        return res.status(200).json({message: 'Noticia deletada'});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createNews,
    getAllNews,
    getLatestNews,
    getNewsById,
    updateNews,
    deleteNews
};
