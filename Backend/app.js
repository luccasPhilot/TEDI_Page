require("dotenv").config();
const { getSecretOrEnv } = require("./src/utils/Enviroments");

const express = require("express");
const cookieParser = require("cookie-parser");
const { testConnection } = require("./src/utils/TestConnection");
const cors = require("cors");

const userRoutes = require("./src/routes/Users.routes");
const newsRoutes = require("./src/routes/News.routes");
const categoriesRoutes = require("./src/routes/Categories.routes");
const authRoutes = require("./src/routes/Auth.routes");
const contactRoutes = require("./src/routes/Contact.routes");
const monitorRoutes = require("./src/routes/Monitor.routes");
const teamMemberRoutes = require("./src/routes/TeamMember.routes");
const test = require("./src/routes/TestRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

const frontend = getSecretOrEnv("FRONTEND_URL");
app.use(
  cors({
    origin: frontend,
    credentials: true,
  })
);

app.use("/user", userRoutes);
app.use("/news", newsRoutes);
app.use("/user", userRoutes);
app.use("/category", categoriesRoutes);
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/monitor", monitorRoutes);
app.use("/teammember", teamMemberRoutes);
app.use("/", test);

app.get("/", (req, res) => {
  res.json({ message: "TEDI API" });
});

// Middleware de erro 404 (sempre depois das rotas)
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});
const PORT = getSecretOrEnv("PORT") || 8080;
app.listen(PORT, () => {
  testConnection();
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
