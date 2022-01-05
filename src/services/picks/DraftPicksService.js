const mongoose = require('mongoose');
const DraftPicks = mongoose.model('DraftPicks');

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