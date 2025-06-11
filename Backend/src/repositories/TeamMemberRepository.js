const TeamMember = require("../models/TeamMember");
const { generateRandomId } = require("../utils/RandonId");

const create = async (data) => {
  const id = generateRandomId();
  const newData = { ...data, id };
  return await TeamMember.create(newData);
};

const findAll = async () => {
  return await TeamMember.findAll({
    attributes: {
      exclude: ["image"],
    },
  });
};

const findImage = async (id) => {
  const member = await TeamMember.findByPk(id, {
    attributes: ["image"],
  });

  return member ? member.image : null;
};

const findById = async (id) => {
  return await TeamMember.findByPk(id);
};

const update = async (TeamMember, data) => {
  return await TeamMember.update(data);
};

const remove = async (TeamMember) => {
  await TeamMember.destroy();
};

module.exports = {
  create,
  findAll,
  findImage,
  findById,
  update,
  remove,
};
