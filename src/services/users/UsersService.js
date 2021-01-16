const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports.findUserByEmail = async function(userEmail) {
    return await Users.findOne({email: userEmail});
}

module.exports.findUserByUsername = async function(username) {
    return await Users.findOne({username: username});
}