const mongoose = require('mongoose');
const Teams = mongoose.model('Teams');

/**
 * 
 * @returns Array of all mongoose team objects including connected owner info
 */
module.exports.getAllTeams = async function() {
    return await Teams.find({}).select('-__v').populate({ path: 'owner', select: 'firstname lastname _id'});
}