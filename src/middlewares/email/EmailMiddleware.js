const nodemailer = require('../../config/nodemailer/nodemailer');

module.exports.sendEmail = async function(recipient, subject, body) {
    let transporter = nodemailer.transporter;
    let info = await transporter.sendMail({
        from: `Sailor Jerry's League Office <${process.env.JAILORS_EMAIL_ADDRESS}>`,
        to: recipient,
        subject: subject,
        text: body
    })
    return info;
}