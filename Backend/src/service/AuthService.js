const userService = require("../service/UserService");
const jwt = require("jsonwebtoken");

const authenticate = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (password !== user.password) {
    throw new Error("Credenciais inválidas.");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );

  return token;
};

const verifyToken = (token) => {
  if (!token) {
    return { isValid: false, message: "Token não fornecido.", status: 400 };
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return { isValid: true, userId: decoded.id, status: 200 };
  } catch (error) {
    return { isValid: false, message: "Token inválido.", status: 401 };
  }
};

module.exports = {
  authenticate,
  verifyToken,
};
