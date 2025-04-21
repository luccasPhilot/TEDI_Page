const express = require('express');
const Auth = require('../controller/AuthController');

const router = express.Router();

router.post('/login', Auth.login);

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout realizado com sucesso.' });
});

module.exports = router;
