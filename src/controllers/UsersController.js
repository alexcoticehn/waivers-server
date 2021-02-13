const PassportService = require('../services/auth/PassportService');
const StatusCodes = require('../constants/StatusCodes');
const AuthService = require('../services/auth/AuthService');
const { JailorsError } = require('../errors/JailorsError');

/**
 * Method to handle login requests
 */
module.exports.userLogin = function(req, res, next) {
    return PassportService.authenticate('login', { session: false }, (err, user) => {
        if (err) {
            next(new JailorsError(err, StatusCodes.UNAUTHORIZED));
        }

        if (user) {
            const token = AuthService.generateJWT(user.username, user._id);
            res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure`);
            return res.json();
        }        
    })(req, res, next);
}

/**
 * Method to verify supplied JWT
 */
module.exports.verifyJWT = function(req, res, _next) {
    return res.status(200).json();
}