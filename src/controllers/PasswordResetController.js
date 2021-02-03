const StatusCodes = require('../constants/StatusCodes');
const PasswordResetService = require('../services/auth/PasswordResetService');
const UsersService = require('../services/users/UsersService');
const EmailService = require('../services/email/EmailService');
const AuthService = require('../services/auth/AuthService');

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
                                    message: "An error occurred, please try again. If the error persists, please contact your side administrator."
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

    PasswordResetService.getPasswordResetLinkFromToken(token)
        .then((resetLink) => {
            if (!resetLink) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        message: "This link is no longer valid. Please request a new one."
                    }
                })
            }
            const token_valid = PasswordResetService.isPasswordResetLinkValid(resetLink.tokenExpires.getTime(), resetLink.pending);
            if (!token_valid) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        message: "This link is no longer valid. Please request a new one."
                    } 
                })
            }
            UsersService.findUserById(resetLink.user_id)
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
                        id: user.id,
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

/**
 * Method to handle actual password reset requests (final step in password reset process)
 */
module.exports.resetPasswordConfirm = function(req, res) {
    const {
        body: { token, password, id },
    } = req;

    PasswordResetService.getPasswordResetLinkFromToken(token)
        .then((resetLink) => {
            if (!resetLink) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        message: "An error occurred, please try again"
                    }
                })
            }
            const token_valid = PasswordResetService.isPasswordResetLinkValid(resetLink.tokenExpires.getTime(), resetLink.pending);
            if (!token_valid) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        message: "This link is no longer valid. Please request a new one."
                    } 
                })
            }
            if (resetLink.user_id.toString() != id) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        message: "An error occurred, please try again"
                    }
                })
            }
            UsersService.findUserById(resetLink.user_id)
                .then((user) => {
                    if (!user) {
                        return res.status(StatusCodes.UNAUTHORIZED).json({
                            errors: {
                                message: "An error occurred, please try again"
                            }
                        })
                    }
                    UsersService.saveUserPassword(user, password)
                        .then((success) => {
                            if (!success) {
                                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                                    errors: {
                                        message: "An error occurred, please try again"
                                    }
                                })
                            }
                            const responseToken = AuthService.generateJWT(user.username, user._id);
                            res.setHeader('Set-Cookie', `token=${responseToken}; HttpOnly; Secure`);
                            return res.json();
                        })
                })
        })
}