const UserRepository = require('../repositories/UserRepository');

const getUserById = async (id) => {
    const user = await UserRepository.findById(id);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return user;
};

const getUserByEmail = async (email) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return user;
};

module.exports = {
    getUserById,
    getUserByEmail
};
