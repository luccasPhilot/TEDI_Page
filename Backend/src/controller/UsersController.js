const UserService = require('../service/UserService');

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.getUserById(id);
        return res.json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getUserById
};
