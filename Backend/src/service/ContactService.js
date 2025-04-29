const contactProvider = require('../providers/ContactProvider');

const sendEmail = async (data) => {
    const {name, email, phoneNumber, message} = data;
    if(!name || !email || !phoneNumber || !message) throw new Error('Todos os campos são obrigatórios.') 
    await contactProvider.sendEmail(data);
};

module.exports = {
    sendEmail,
};


