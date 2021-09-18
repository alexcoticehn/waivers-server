const { validationResult } = require("express-validator");
const StatusCodes = require("../constants/StatusCodes");
const {JailorsError} = require('../errors/JailorsError');
const {ValidationError} = require('../errors/ValidationError');

module.exports.checkValidationErrors = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new ValidationError(errors.array(), StatusCodes.BAD_REQUEST));
    }
    next();
}

/**
 * Verifies that the password reset token check request is sent in the correct format
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.verifyPasswordResetTokenRequest = function(req, res, next) {
    if (!req.body.token) {
        throw new JailorsError('Missing request parameter', StatusCodes.BAD_REQUEST);
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
        throw new JailorsError('Missing request parameter', StatusCodes.BAD_REQUEST);
    }
    next();
}