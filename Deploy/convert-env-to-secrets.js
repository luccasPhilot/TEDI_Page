const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, ".env");
const secretsDir = path.resolve(__dirname, ".secrets");

if (!fs.existsSync(envPath)) {
  console.error("Arquivo .env não encontrado.");
  process.exit(1);
}

if (!fs.existsSync(secretsDir)) {
  fs.mkdirSync(secretsDir);
}

const envContent = fs.readFileSync(envPath, "utf8");

envContent.split("\n").forEach((line) => {
  const cleanLine = line.trim();
  if (!cleanLine || cleanLine.startsWith("#")) return;

  const [key, ...valueParts] = cleanLine.split("=");
  const value = valueParts.join("=").trim();

  const filePath = path.join(secretsDir, key.trim());

  fs.writeFileSync(filePath, value + "\n", { encoding: "utf8" });
  console.log(`Criado: .secrets/${key.trim()}`);
});

console.log("\nConversão concluída!");
