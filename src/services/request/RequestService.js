const statusCodes = require("../../routes/statusCodes");

module.exports.verifyLoginRequest = function(req, res, next) {
    if (!req.body.user || !req.body.user.username || !req.body.user.password) {
        return res.status(statusCodes.BAD_REQUEST).json({});
    }
    next();
}