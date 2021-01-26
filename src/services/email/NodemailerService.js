const nodemailer = require('nodemailer');

module.exports.getTransporter = function() {
    let transporter;
    if (process.env.NODE_ENV === 'test') {
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.JAILORS_TEST_EMAIL_ADDRESS,
                pass: process.env.JAILORS_TEST_EMAIL_PASSWORD
            }   
        });
    } else {
        transporter = nodemailer.createTransport({
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
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    return transporter;
}