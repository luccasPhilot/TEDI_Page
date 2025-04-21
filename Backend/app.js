require("dotenv").config();

const express = require('express');
const cookieParser = require('cookie-parser');
const { testConnection } = require('./src/utils/TestConnection')

const userRoutes = require('./src/routes/Users.routes');
const authRoutes = require('./src/routes/Auth.routes');
const test = require('./src/routes/TestRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/', test);

// Middleware de erro 404 (sempre depois das rotas)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    testConnection();
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
