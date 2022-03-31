const mongoose = require('mongoose');
const DraftPicks = mongoose.model('DraftPicks');

/**
 * 
 * @param {ObjectId} year 
 * @param {ObjectId} originalTeam 
 * @param {ObjectId} pickingTeam 
 * @param {ObjectId} currentTeam 
 * @param {ObjectId} player 
 * @param {String} pickingTeamName 
 * @param {String} pickingOwnerName 
 * @param {Number} round 
 * @param {Number} overall 
 * @param {Number} contractYearsOriginal 
 * @param {Number} contractYearsRemaining 
 * @param {Number} status 
 * @param {Number} timesExtended 
 * @returns 
 */
module.exports.saveDraftPickRecord = async function(year, originalTeam, pickingTeam, currentTeam, player, pickingTeamName, pickingOwnerName, round, overall, contractYearsOriginal, contractYearsRemaining, status, timesExtended) {
    const pick = await DraftPicks.create({
        year: year,
        originalTeam: originalTeam,
        pickingTeam: pickingTeam,
        currentTeam: currentTeam,
        player: player,
        pickingTeamName: pickingTeamName,
        pickingOwnerName: pickingOwnerName,
        round: round,
        overall: overall,
        contractYearsOriginal: contractYearsOriginal,
        contractYearsRemaining: contractYearsRemaining,
        status: status,
        timesExtended: timesExtended
    });

    return pick;
}