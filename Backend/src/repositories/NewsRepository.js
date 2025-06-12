const News = require("../models/News");
const NewsCategory = require("../models/NewsCategory");
const { generateRandomId } = require("../utils/RandonId");

const create = async (data) => {
  const id = generateRandomId();
  const newData = { ...data, id };
  return await News.create(newData);
};

const findAll = async () => {
  return await News.findAll({
    include: [
      {
        model: NewsCategory,
        attributes: ["id", "name"],
      },
    ],
    attributes: {
      exclude: ["image"],
    },
  });
};

const findImage = async (id) => {
  const news = await News.findByPk(id, { attributes: ["image"] });

  return news ? news.image : null;
};

const findLatest = async () => {
  return await News.findAll({
    where: {
      draft: false,
    },
    include: [
      {
        model: NewsCategory,
        attributes: ["id", "name"],
      },
    ],
    order: [["creation_date", "DESC"]],
    limit: 3,
    attributes: {
      exclude: ["image"],
    },
  });
};

const findById = async (id) => {
  return await News.findByPk(id, {
    include: [
      {
        model: NewsCategory,
        attributes: ["id", "name"],
      },
    ],
  });
};

const update = async (news, data) => {
  return await news.update(data);
};

const remove = async (news) => {
  await news.destroy();
};

module.exports = {
  create,
  findAll,
  findById,
  findImage,
  findLatest,
  update,
  remove,
};
