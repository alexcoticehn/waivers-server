const StatusCodes = require("../constants/StatusCodes");
const {JailorsError} = require('../errors/JailorsError');

/**
 * Verifies that a login request is sent in the correct format
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.verifyLoginRequest = function(req, res, next) {
    if (!req.body.user || !req.body.user.username || !req.body.user.password) {
        const error = new JailorsError('Missing request parameter', StatusCodes.BAD_REQUEST);
        next(error);
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
        const error = new JailorsError('Missing request parameter', StatusCodes.BAD_REQUEST);
        next(error);
    }
    next()
}

/**
 * Verifies that the password reset token check request is sent in the correct format
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.verifyPasswordResetTokenRequest = function(req, res, next) {
    if (!req.body.token) {
        const error = new JailorsError('Missing request parameter', StatusCodes.BAD_REQUEST);
        next(error);
    }
    next();
}

/**
 * Verifies that the password reset confirmation reques is sent in the correct format
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.verifyPasswordResetConfirmationRequest = function(req, res, next) {
    if (!req.body.token || !req.body.password || !req.body.id) {
        const error = new JailorsError('Missing request parameter', StatusCodes.BAD_REQUEST);
        next(error);
    }
    next();
}