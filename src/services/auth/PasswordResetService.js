const mongoose = require('mongoose');
const crypto = require('crypto');
const PasswordResetConstants = require('../../constants/PasswordResetConstants');
const PasswordResetLinks = mongoose.model('PasswordResetLinks');

/**
 * Generate password reset link entity and save to db
 * @param {ObjectId} userId 
 */
module.exports.createOrUpdatePasswordResetLink = async function(userId) {
    let resetLink = await findExistingPasswordResetLink(userId);

    if (resetLink) {
        resetLink.tokenExpires = Date.now() + 3600000;
        resetLink = await resetLink.save();
    } else {
        const newResetLink = {
            token: crypto.randomBytes(20).toString('hex'),
            tokenExpires: Date.now() + 3600000,
            pending: PasswordResetConstants.StatusPending,
            user_id: userId
        }

        resetLink = await PasswordResetLinks.create(newResetLink);
    }

    return resetLink;
}

/**
 * Grab existing password reset link for this user if exists
 * @param {ObjectId} userId 
 */
async function findExistingPasswordResetLink(userId) {
    const resetLink = await PasswordResetLinks.findOne({user_id: userId, pending: 1})
    return resetLink;
}

/**
 * 
 * @param {String} token 
 */
module.exports.getUserIdFromPasswordResetToken = async function(token) {
    const resetLink = await findPasswordResetLinkFromToken(token);
    if (resetLink) {
        if (!this.isPasswordResetLinkValid(resetLink.tokenExpires.getTime(), resetLink.pending)) {
            return false;
        }
    }
    return resetLink.user_id;
}

/**
 * Verifies PasswordResetLink object is still valid (pending and time not expired)
 * @param {int} expires
 * @param {int} pending
 */
module.exports.isPasswordResetLinkValid = function(expires, pending) {
    return (expires > Date.now() && pending);
}

/**
 * Find password reset link (if exists) for given token
 * @param {string} token 
 */
async function findPasswordResetLinkFromToken(token) {
    const resetLink = await PasswordResetLinks.findOne({token: token});
    return resetLink;
}