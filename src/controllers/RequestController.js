const StatusCodes = require("../constants/StatusCodes");

/**
 * Verifies that a login request is sent in the correct format
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.verifyLoginRequest = function(req, res, next) {
    if (!req.body.user || !req.body.user.username || !req.body.user.password) {
        return res.status(StatusCodes.BAD_REQUEST).json({});
    }
    next();
}

/**
 * Verifies that a password reset request is sent in the correct format
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.verifyPasswordResetRequest = function(req, res, next) {
    if (!req.body.user || !req.body.user.email) {
        return res.status(StatusCodes.BAD_REQUEST).json({});
    }
    next()
}

/**
 * Verifies that the password reset token check request is sent in the correct format
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.verifyPasswordResetLink = function(req, res, next) {
    if (!req.body.token) {
        return res.status(StatusCodes.BAD_REQUEST).json({});
    }
    next();
}