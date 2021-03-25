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

/**
 * Returns body of the password reset email to be sent with url to follow
 */
module.exports.getResetPasswordEmailBody = function(referer, token) {
    return "A password reset has been triggered on the account associated with this email. Please follow the link below.\n" +
        "The link is valid for 60 minutes from the time of request. Once this link expires, you will have to request a new reset link. \n\n" +
        referer + 'reset/' + token;
}