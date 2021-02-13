const PassportService = require('../services/auth/PassportService');
const StatusCodes = require('../constants/StatusCodes');
const AuthService = require('../services/auth/AuthService');
const { JailorsError } = require('../errors/JailorsError');
const PassportConstants = require('../constants/PassportConstants');

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
            if (process.env.NODE_ENV === 'production') {
                res.setHeader('Set-Cookie', `${PassportConstants.TokenCookie}=${token}; HttpOnly; Secure`);
            } else {
                res.setHeader('Set-Cookie', `${PassportConstants.TokenCookie}=${token}; HttpOnly`);
            }
            return res.json();
        }        
    })(req, res, next);
}

/**
 * Method to verify supplied JWT
 */
module.exports.verifyJWT = function(req, res, next) {
    return PassportService.authenticate('jwt', { session: false }, (err, userId) => {
        if (userId) {
            next();
        } else {
            next(new JailorsError("Sesson expired. Please login again", StatusCodes.UNAUTHORIZED));
        }
    })(req, res, next);
}