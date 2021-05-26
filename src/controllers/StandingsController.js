const StandingsService = require('../services/teams/StandingsService');

module.exports.getStandings = async function(req, res) {
    let standings;
    if (req.query.team && req.query.year) {
        standings = await StandingsService.getStandingsByYearAndTeam(req.query.team, req.query.year);
    } else if (req.query.team) {
        standings = await StandingsService.getStandingsByTeam(req.query.team);
    } else if (req.query.year) {
        standings = await StandingsService.getStandingsByYear(req.query.year);
    } else {
        standings = await StandingsService.getAllStandings();
    }

    return res.json({
        standings: standings
    });
}