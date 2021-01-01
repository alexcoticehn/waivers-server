const mongoose = require('../../config/mongoose/mongoose');
const Users = mongoose.model('Users');

module.exports.findUserByEmail = async function(userEmail) {
    return await Users.findOne({email: userEmail});
}