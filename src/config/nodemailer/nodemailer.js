const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.JAILORS_EMAIL_API_ACCESS,
        serviceClient: process.env.JAILORS_EMAIL_CLIENT_ID,
        privateKey: process.env.JAILORS_EMAIL_CLIENT_KEY
    }
});

module.exports.transporter = transporter;