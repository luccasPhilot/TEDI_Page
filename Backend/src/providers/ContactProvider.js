const nodemailer = require("nodemailer");
const { getSecretOrEnv } = require("../utils/Enviroments");

const EMAIL_USER = getSecretOrEnv("EMAIL_USER");
const EMAIL_PASS = getSecretOrEnv("EMAIL_PASS");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const escape = (str) =>
  String(str || "").replace(
    /[<>&"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
      }[c])
  );

const sendEmail = async ({ name, email, phoneNumber, message }) => {
  const escapedName = escape(name);
  const escapedEmail = escape(email);
  const escapedPhone = escape(phoneNumber);
  const escapedMessage = escape(message).replace(/\n/g, "<br>");

  const subject = `📩 Tedi Page - Novo contato de ${escapedName}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 16px; color: #333;">
      <h2 style="color: #0055a5;">Novo contato recebido</h2>
      <p><strong>Nome:</strong> ${escapedName}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapedEmail}">${escapedEmail}</a></p>
      <p><strong>Telefone:</strong> <a href="tel:${escapedPhone}">${escapedPhone}</a></p>
      <p><strong>Mensagem:</strong></p>
      <div style="background: #f9f9f9; padding: 12px; border-left: 4px solid #0055a5;">
        ${escapedMessage}
      </div>
      <hr style="margin-top: 30px;">
      <small style="color: #888;">Este e-mail foi enviado automaticamente pelo site do TEDI.</small>
    </div>
  `;

  const textContent = `
Novo contato recebido

Nome: ${name}
Email: ${email}
Telefone: ${phoneNumber}

Mensagem:
${message}
  `.trim();

  await transporter.sendMail({
    from: `"Contato do site" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    replyTo: email,
    subject,
    text: textContent,
    html: htmlContent,
  });

  console.log(`Email enviado para ${EMAIL_USER} de ${email}`);
};

module.exports = {
  sendEmail,
};
