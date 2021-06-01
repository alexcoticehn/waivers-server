const StatusCodes = require("../constants/StatusCodes");
const TeamsService = require('../services/teams/TeamsService');
const { JailorsError } = require('../errors/JailorsError');

/**
 * Method to handle get request for all teams
 */
module.exports.getTeams = function(req, res, next) {
    TeamsService.getAllTeams()
        .then((teams) => {
            return res.status(StatusCodes.OK).json({
                teams: teams
            });  
        })
        .catch(() => {
            const error = new JailorsError("An error occurred, please try again", StatusCodes.INTERNAL_SERVER_ERROR);
            next(error);
        })
}