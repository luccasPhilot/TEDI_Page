const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'TEDI API' });
});

router.get('/protected', authMiddleware.authMiddleware, (req, res) => {
    res.json({ message: 'TEDI API' });
});

module.exports = router;
