const StatusCodes = require("../constants/StatusCodes");

/**
 * Method to handle get request for all teams
 */
module.exports.getTeams = function(req, res) {
    return res.status(StatusCodes.OK).json();
}