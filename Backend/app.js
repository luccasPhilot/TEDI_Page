require("dotenv").config();
const express = require('express');
const { testConnection } = require("./src/utils/TestConnection")

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

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
