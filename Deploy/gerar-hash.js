const bcrypt = require("bcrypt");

(async () => {
  const senha = "";
  const saltRounds = 10;
  const hash = await bcrypt.hash(senha, saltRounds);
  console.log("Senha hasheada:", hash);
})();
