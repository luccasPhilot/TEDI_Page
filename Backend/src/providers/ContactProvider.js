const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendEmail = async ({name, email, phoneNumber, message}) => {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: "Novo Contato",
        text: "Novo contato",
        html: `
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phoneNumber}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
        `,
    });
};

module.exports = {
    sendEmail
};
