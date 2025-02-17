const DraftPickConstants = require('../constants/DraftPickConstants');
const DraftPicksService = require('../services/picks/DraftPicksService');

/**
 * Method to add draft picks 
 */
module.exports.saveDraftPick = async function(req, res, _next) {
    const body = req.body;
    if (!body.currentTeam) {
        body.currentTeam = body.originalTeam;
    }
    if (!body.pickingTeam && body.player) {
        body.pickingTeam = body.currentTeam;
    }
    if (!body.player) {
        body.status = DraftPickConstants.StatusPending;
    }
    const pick = await DraftPicksService.saveDraftPickRecord(body.year, body.originalTeam, body.pickingTeam, body.currentTeam, 
        body.player, body.pickingTeamName, body.pickingOwnerName, body.round, body.overall, body.contractYearsOriginal, 
        body.contractYearsRemaining, body.status, body.timesExtended);
    return res.json({pick});
}