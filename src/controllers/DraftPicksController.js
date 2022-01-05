const DraftPicksService = require('../services/picks/DraftPicksService');

/**
 * Method to add draft picks 
 */
module.exports.saveDraftPick = async function(req, res, _next) {
    const body = req.body;
    // eslint-disable-next-line no-unused-vars
    const pick = await DraftPicksService.saveDraftPickRecord(body.year, body.originalTeam, body.pickingTeam, body.currentTeam, 
        body.player, body.pickingTeamName, body.pickingOwnerName, body.round, body.overall, body.contractYearsOriginal, 
        body.contractYearsRemaining, body.status, body.timesExtended);
    return res.json({pick});
}