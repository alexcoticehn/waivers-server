const StatusCodes = require('../constants/StatusCodes');
const PasswordResetService = require('../services/auth/PasswordResetService');
const UsersService = require('../services/users/UsersService');
const EmailService = require('../services/email/EmailService');

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

/**
 * Method to handle password reset token validity request
 */
module.exports.verifyResetTokenValid = function(req, res) {
    const {
        body: { token },
    } = req;

    PasswordResetService.getUserIdFromPasswordResetToken(token)
        .then((userId) => {
            if (!userId) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        message: "This link is no longer valid. Please request a new one."
                    }
                })
            }
            UsersService.findUserById(userId)
                .then((user) => {
                    if (!user) {
                        return res.status(StatusCodes.UNAUTHORIZED).json({
                            errors: {
                                message: "An error occurred, please try again"
                            }
                        })
                    }
                    return res.status(StatusCodes.OK).json({
                        firstname: user.firstname,
                        id: user._id,
                        token: token
                    })
                })
                .catch(() => {
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        errors: {
                            message: "An error occurred, please try again"
                        }
                    })
                })
        })
        .catch(() => {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    message: "An error occurred, please try again"
                }
            })
        })
}