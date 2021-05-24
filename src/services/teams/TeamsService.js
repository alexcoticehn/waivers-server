const mongoose = require('mongoose');
const Teams = mongoose.model('Teams');

/**
 * 
 * @returns Array of all mongoose team objects (version excluded)
 */
module.exports.getAllTeams = async function() {
    return await Teams.find({}).select('-__v');
}