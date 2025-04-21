const UserRepository = require('../repositories/UserRepository');

const getUserById = async (id) => {
    const user = await UserRepository.findById(id);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    return user;
};

module.exports = {
    getUserById
};
