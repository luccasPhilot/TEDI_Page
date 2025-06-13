const ContactService = require("../service/ContactService");

const sendEmail = async (req, res) => {
  try {
    const newData = req.body;
    await ContactService.sendEmail(newData);
    return res.status(200).json({ message: "Email enviado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendEmail,
};
