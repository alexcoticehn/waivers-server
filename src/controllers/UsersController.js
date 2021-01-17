const PassportService = require('../services/auth/PassportService');
const StatusCodes = require('../routes/statusCodes');
const PasswordResetService = require('../services/auth/PasswordResetService');
const UsersService = require('../services/users/UsersService');
const EmailService = require('../services/email/EmailService');
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

/**
 * Method to handle password reset requests
 */
module.exports.sendResetEmail = function(req, res) {
    const {
        body: { user },
    } = req;

    UsersService.findUserByEmail(user.email)
        .then((user) => {
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        email: "is not associated with an account"
                    }
                })
            }

            PasswordResetService.createOrUpdatePasswordResetLink(user._id)
                .then((resetLink) => {
                    EmailService.sendEmail(user.email, 'Password Reset Email', resetLink.token)
                        .then(() => {
                            return res.status(StatusCodes.OK).json({
                                message: "Password reset email sent"
                            })
                        })
                        .catch(() => {
                            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                                errors: {
                                    message: "An error occurred, please try again"
                                }
                            })
                        });
                })
                .catch(() => {
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        errors: {
                            message: "An error occurred, please try again"
                        }
                    })
                })
        })
}