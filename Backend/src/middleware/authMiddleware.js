const jwt = require("jsonwebtoken");
const users = require("../service/UserService");

const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) return res.sendStatus(401);

        const parts = authorization.split(" ");

        if (parts.length !== 2) return res.sendStatus(401);
        const [schema, token] = parts;

        if (schema !== "Bearer") return res.sendStatus(401);

        jwt.verify(token, process.env.SECRET, async (error, decoded) => {
            if (error) {
                return res.status(500).send({ message: "Token inválido" });
            }

            const user = await users.getUserByUsername(decoded.id);
            if (!user) return res.status(404).send({ message: "Usuário não encontrado" });

            req.userId = user.username;
            req.userTipo = user.tipo;

            return next();
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    authMiddleware,
};