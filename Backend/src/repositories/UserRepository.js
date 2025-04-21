const User = require('../models/User');

const findById = async (id) => {
    return await User.findByPk(id);
};

module.exports = {
    findById
};
