const StatusCodes = require('../constants/StatusCodes');
const { JailorsError } = require('../errors/JailorsError');
const YearsService = require('../services/years/YearsService');

module.exports.getYears = function(req, res, next) {
    YearsService.getAllYears()
        .then((years) => {
            return res.json({
                years: years
            })
        })
        .catch(() => {
            next(new JailorsError('An error occurred', StatusCodes.INTERNAL_SERVER_ERROR));
        })
}