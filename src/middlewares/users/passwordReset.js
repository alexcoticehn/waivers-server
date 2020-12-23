/* global require */
const mongoose = require('../../config/mongoose/mongoose');
const crypto = require('crypto');

const PasswordResetLinks = mongoose.model("PasswordResetLinks");

const createPasswordResetLink = async function(userId) {
    const newResetLink = {
        token: await crypto.randomBytes(20).toString('hex'),
        tokenExpires: Date.now + 3600000,
        user_id: userId
    }

    PasswordResetLinks.create(newResetLink);
}

/* global module */
module.exports = createPasswordResetLink;