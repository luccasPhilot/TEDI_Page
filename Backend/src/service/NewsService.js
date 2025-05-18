const NewsRepository = require('../repositories/NewsRepository');

const createNews = async (data) => {
    return await NewsRepository.create(data);
};

const getNewsById = async (id) => {
    const news = await NewsRepository.findById(id);
    if (!news) {
        throw new Error('Noticia não encontrada');
    }
    return news;
};

const getAllNews = async () => {
    return await NewsRepository.findAll();
};

const getLatestNews = async () => {
    return await NewsRepository.findLatest();
};

const updateNews = async (id, data) => {
    const news = await NewsRepository.findById(id);
    if (!news) {
        throw new Error('Noticia não encontrada');
    }
    return await NewsRepository.update(news, data);
};

const deleteNews = async (id) => {
    const news = await NewsRepository.findById(id);
    if (!news) {
        throw new Error('Noticia não encontrada');
    }
    await NewsRepository.remove(news);
};

module.exports = {
    createNews,
    getNewsById,
    getAllNews,
    getLatestNews,
    updateNews,
    deleteNews
};


