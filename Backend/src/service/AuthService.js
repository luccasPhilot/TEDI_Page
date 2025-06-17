const userService = require("../service/UserService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getSecretOrEnv } = require("../utils/Enviroments");
const SECRET = getSecretOrEnv("SECRET");
const TOKEN_EXPIRATION = getSecretOrEnv("TOKEN_EXPIRATION");

const authenticate = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciais inválidas.");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });

  return token;
};

const verifyToken = (token) => {
  if (!token) {
    return { isValid: false, message: "Token não fornecido.", status: 400 };
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return { isValid: true, userId: decoded.id, status: 200 };
  } catch (error) {
    return { isValid: false, message: "Token inválido.", status: 401 };
  }
};

module.exports = {
  authenticate,
  verifyToken,
};
