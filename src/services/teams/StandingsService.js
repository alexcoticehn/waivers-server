const mongoose = require('mongoose');
const Standings = mongoose.model('Standings');

/**
 * 
 * @param {String} team_id 
 * @param {String} year_id 
 * @returns Standings document for given team and year
 */
module.exports.getStandingsByYearAndTeam = async function(team_id, year_id) {
    return await Standings.findOne({ team: team_id, year: year_id }).select('-_id');
}

/**
 * 
 * @param {String} team_id 
 * @returns All standings documents for the given team
 */
module.exports.getStandingsByTeam = async function(team_id) {
    return await Standings.find({ team: team_id }).select('-_id');
}

/**
 * 
 * @param {String} year_id 
 * @returns All standings documents for the given year
 */
module.exports.getStandingsByYear = async function(year_id) {
    return await Standings.find({ year: year_id }).select('-_id');
}

/**
 * 
 * @returns all standings documents
 */
module.exports.getAllStandings = async function() {
    return await Standings.find({}).select('-_id');
}