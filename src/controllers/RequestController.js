const { validationResult } = require("express-validator");
const StatusCodes = require("../constants/StatusCodes");
const {ValidationError} = require('../errors/ValidationError');

module.exports.checkValidationErrors = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new ValidationError(errors.array(), StatusCodes.BAD_REQUEST));
    }
    next();
}