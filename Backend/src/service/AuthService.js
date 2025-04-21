const userService = require('../service/UserService');
const jwt = require("jsonwebtoken");

const authenticate = async (id, password) => {
    const user = await userService.getUserById(id);
    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    if (password !== user.password) {
        throw new Error('Credenciais inválidas.');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });

    return token;
};

module.exports = {
    authenticate,
};
