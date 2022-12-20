const postmark = require('postmark');

module.exports.sendEmail = async function(recipient, subject, body) {
    let info;
    if (process.env.NODE_ENV === 'production') {
        const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
        const message = {
            "To": recipient,
            "From": `Sailor Jerry's League Office <admin@jailors.xyz>`,
            "Subject": subject,
            "TextBody": body
        };

        info = client.sendEmail(message); // I think this is synchronous
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