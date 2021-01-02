const nodemailer = require('nodemailer');

// Your access token may expire in 200 days which would be sometime in mid-July
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
        refreshToken: process.env.JAILORS_EMAIL_REFRESH_TOKEN
    }
});

module.exports.transporter = transporter;