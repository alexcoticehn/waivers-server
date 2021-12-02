const { JailorsError } = require('../errors/JailorsError');
const PlayersService = require('../services/players/PlayersService');

module.exports.searchPlayers = async function(req, res, next) {
    return PlayersService.searchPlayersByFirstAndLastName(req.query.firstname, req.query.lastname)
        .then((players) => {
            return res.json({
                players: players
            });
        })
        .catch(() => {
            next(new JailorsError('An error occurred. If the error persists, please contact your system administrator.'));
        })
}