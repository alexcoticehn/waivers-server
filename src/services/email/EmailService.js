const sendGrid = require('@sendgrid/mail');

module.exports.sendEmail = async function(recipient, subject, body) {
    let info;
    if (process.env.NODE_ENV === 'production') {
        sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
        const message = {
            to: recipient,
            from: `Sailor Jerry's League Office <${process.env.JAILORS_EMAIL_ADDRESS}>`,
            subject: subject,
            text: body
        }

        info = await sendGrid.send(message);
    } else {
        info = Promise.resolve();
    }
    return info;
}