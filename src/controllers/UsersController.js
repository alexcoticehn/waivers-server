const PassportService = require('../services/auth/PassportService');
const StatusCodes = require('../constants/StatusCodes');
const AuthService = require('../services/auth/AuthService');

/**
 * Method to handle login requests
 */
module.exports.userLogin = function(req, res, next) {
    return PassportService.authenticate('login', { session: false }, async (err, user, _info) => {
        if (err) {
            return next(err);
        }

        if (user) {
            const token = AuthService.generateJWT(user.username, user._id);
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure`);
            return res.json();
        }

        if (_info.errors) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: _info.errors
            })
        }
    })(req, res, next);
}