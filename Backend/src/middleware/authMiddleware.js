const jwt = require("jsonwebtoken");
const users = require("../service/UserService");
const { getSecretOrEnv } = require("../utils/Enviroments");
const SECRET = getSecretOrEnv("SECRET");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.sendStatus(401);

    // Verifica e decodifica o token
    jwt.verify(token, SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Token inválido" });
      }

      const user = await users.getUserById(decoded.id);
      if (!user)
        return res.status(404).send({ message: "Usuário não encontrado" });

      // Anexa o ID do usuário à requisição
      req.userId = user.id;

      return next();
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  authMiddleware,
};
