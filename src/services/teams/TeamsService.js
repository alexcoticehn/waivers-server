const mongoose = require('mongoose');
const Teams = mongoose.model('Teams');

module.exports.findAllTeams = async function() {
    return await Teams.find({});
}