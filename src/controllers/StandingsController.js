const { JailorsError } = require('../errors/JailorsError');
const StandingsService = require('../services/teams/StandingsService');

/**
 * Method to handle GET standings requests
 * Filters by year or team if parameters provided
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 */
module.exports.getStandings = async function(req, res, next) {
    let standings;
    try {
        if (req.query.team && req.query.year) {
            standings = await StandingsService.getStandingsByYearAndTeam(req.query.team, req.query.year);
        } else if (req.query.team) {
            standings = await StandingsService.getStandingsByTeam(req.query.team);
        } else if (req.query.year) {
            standings = await StandingsService.getStandingsByYear(req.query.year);
        } else {
            standings = await StandingsService.getAllStandings();
        }
    } catch(err) {
        next(new JailorsError('An error occurred. If the error persists, please contact your system administrator.'));
    }

    return res.json({
        standings: standings
    });
}