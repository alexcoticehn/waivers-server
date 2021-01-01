const mongoose = require('../../../config/mongoose/mongoose');
const crypto = require('crypto');

const PasswordResetLinks = mongoose.model("PasswordResetLinks");

const StatusPending = 1;

/**
 * Generate password reset link entity and save to db
 * @param {ObjectId} userId 
 */
module.exports = async function createOrUpdatePasswordResetLink(userId) {
    const resetLink = await findExistingPasswordResetLink(userId);

    if (resetLink) {
        resetLink.tokenExpires = Date.now() + 3600000;
        resetLink.save();
    } else {
        const newResetLink = {
            token: crypto.randomBytes(20).toString('hex'),
            tokenExpires: Date.now() + 3600000,
            pending: StatusPending,
            user_id: userId
        }

    PasswordResetLinks.create(newResetLink);
    }

    // email user here
}

async function findExistingPasswordResetLink(userId) {
    const resetLink = await PasswordResetLinks.findOne({user_id: userId, pending: 1})
    return resetLink;
}