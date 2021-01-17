const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.JAILORS_EMAIL_ADDRESS,
        clientId: process.env.JAILORS_EMAIL_CLIENT_ID,
        clientSecret: process.env.JAILORS_EMAIL_CLIENT_SECRET,
        accessToken: process.env.JAILORS_EMAIL_ACCESS_TOKEN,
        refreshToken: process.env.JAILORS_EMAIL_REFRESH_TOKEN,
        tls: {
            rejectUnauthorized: false
        }
    }
});

module.exports.transporter = transporter;