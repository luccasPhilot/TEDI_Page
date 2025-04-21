require("dotenv").config();
const express = require('express');
const { testConnection } = require("./src/utils/TestConnection")
const userRoutes = require('./src/routes/Users.routes');
const newsRoutes = require('./src/routes/News.routes');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use('/user', userRoutes);
app.use('/news', newsRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'TEDI API' });
});

// Middleware de erro 404 (sempre depois das rotas)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    testConnection();
    console.log(`Server is running on http://localhost:${PORT}`);
});
