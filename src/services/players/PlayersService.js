const mongoose = require('mongoose');
const Players = mongoose.model('Players');

/**
 * 
 * @param {String} firstname_string 
 * @param {String} lastname_string 
 * @returns All players that match given name search criteria
 */
module.exports.searchPlayersByFirstAndLastName = async function(firstname_string, lastname_string, limit) {
    return await Players.find({ firstname: new RegExp(firstname_string, "i"), lastname: new RegExp(lastname_string, "i") }).limit(limit).exec();
}