const User = require('../models/User');

const findById = async (id) => {
    return await User.findByPk(id);
};

const findByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

module.exports = {
    findById,
    findByEmail
};
