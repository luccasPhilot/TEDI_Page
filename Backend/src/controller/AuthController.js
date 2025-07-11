const authService = require("../service/AuthService");
const { getSecretOrEnv } = require("../utils/Enviroments");
const TOKEN_EXPIRATION = getSecretOrEnv("TOKEN_EXPIRATION");

const login = async (req, res) => {
  try {
    const { id: email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email e senha são obrigatórios." });
    }

    const token = await authService.authenticate(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: parseInt(TOKEN_EXPIRATION),
    });

    return res.status(200).json({ message: "Autenticado com sucesso" });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const validateToken = async (req, res) => {
  const token = req.cookies.token;

  const validationResult = authService.verifyToken(token);

  if (!validationResult.isValid) {
    return res
      .status(validationResult.status)
      .json({ isValid: false, message: validationResult.message });
  }

  return res
    .status(validationResult.status)
    .json({ isValid: true, userId: validationResult.userId });
};

module.exports = {
  login,
  validateToken,
};
