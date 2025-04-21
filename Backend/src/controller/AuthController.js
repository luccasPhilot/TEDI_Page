// src/controller/AuthController.js
const authService = require('../service/AuthService');

const login = async (req, res) => {
    try {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(400).json({ message: 'id e senha são obrigatórios.' });
        }

        const token = await authService.authenticate(id, password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: parseInt(process.env.TOKEN_EXPIRATION)
        });

        return res.status(200).json({ message: 'Autenticado com sucesso' });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = {
    login,
};
