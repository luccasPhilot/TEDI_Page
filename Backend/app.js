require("dotenv").config();

const express = require('express');
const cookieParser = require('cookie-parser');
const { testConnection } = require('./src/utils/TestConnection')
const cors = require('cors');

const userRoutes = require('./src/routes/Users.routes');
const newsRoutes = require('./src/routes/News.routes');
const categoriesRoutes = require('./src/routes/Categories.routes');
const authRoutes = require('./src/routes/Auth.routes');
const contactRoutes = require('./src/routes/Contact.routes');
const monitorRoutes = require('./src/routes/Monitor.routes');
const test = require('./src/routes/TestRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:4200', // ou o domínio do frontend
  credentials: true
}));

app.use('/user', userRoutes);
app.use('/news', newsRoutes);
app.use('/user', userRoutes);
app.use('/category', categoriesRoutes);
app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);
app.use('/monitor', monitorRoutes);
app.use('/', test);

app.get('/', (req, res) => {
    res.json({ message: 'TEDI API' });
});

// Middleware de erro 404 (sempre depois das rotas)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    testConnection();
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
