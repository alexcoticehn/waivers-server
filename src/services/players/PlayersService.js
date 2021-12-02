const mongoose = require('mongoose');
const Players = mongoose.model('Players');

module.exports.searchPlayersByFirstAndLastName = async function(firstname_string, lastname_string) {
    return await Players.find({ firstname: new RegExp(firstname_string, "i"), lastname: new RegExp(lastname_string, "i") }).exec();
}