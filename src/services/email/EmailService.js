const nodemailer = require('./NodemailerService');

module.exports.sendEmail = async function(recipient, subject, body) {
    let transporter = nodemailer.getTransporter();
    let info = await transporter.sendMail({
        from: `Sailor Jerry's League Office <${process.env.JAILORS_EMAIL_ADDRESS}>`,
        to: recipient,
        subject: subject,
        text: body
    })
    return info;
}