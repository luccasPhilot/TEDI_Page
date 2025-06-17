const { Sequelize } = require("sequelize");
const { getSecretOrEnv } = require("../utils/Enviroments");

const DB_HOST = getSecretOrEnv("DB_HOST");
const DB_USER = getSecretOrEnv("DB_USER");
const DB_PASS = getSecretOrEnv("DB_PASS");
const DB_NAME = getSecretOrEnv("DB_NAME");
const DB_PORT = getSecretOrEnv("DB_PORT");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
