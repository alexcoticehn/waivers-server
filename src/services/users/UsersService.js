const mongoose = require('mongoose');
const Users = mongoose.model('Users');

/**
 * 
 * @param {String} userEmail 
 */
module.exports.findUserByEmail = async function(userEmail) {
    return await Users.findOne({email: userEmail});
}

/**
 * 
 * @param {String} username 
 */
module.exports.findUserByUsername = async function(username) {
    return await Users.findOne({username: username});
}

/**
 * 
 * @param {ObjectId} userId 
 */
module.exports.findUserById = async function(userId) {
    return await Users.findById(userId);
}