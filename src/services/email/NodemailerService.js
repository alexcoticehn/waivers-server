const nodemailer = require('nodemailer');

module.exports.getTransporter = function() {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: process.env.JAILORS_TEST_EMAIL_ADDRESS,
            pass: process.env.JAILORS_TEST_EMAIL_PASSWORD
        }   
    });

    return transporter;
}