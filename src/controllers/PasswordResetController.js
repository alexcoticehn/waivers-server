const StatusCodes = require('../constants/StatusCodes');
const PasswordResetService = require('../services/auth/PasswordResetService');
const UsersService = require('../services/users/UsersService');
const EmailService = require('../services/email/EmailService');
const AuthService = require('../services/auth/AuthService');
const { JailorsError } = require('../errors/JailorsError');

/**
 * Method to handle password reset requests
 */
module.exports.sendResetEmail = function(req, res, next) {
    const {
        body: { user },
    } = req;

    UsersService.findUserByEmail(user.email)
        .then((user) => {
            if (!user) {
                throw new JailorsError('This email is not associated with a user account', StatusCodes.UNAUTHORIZED);
            }
            PasswordResetService.createOrUpdatePasswordResetLink(user._id)
                .then((resetLink) => {
                    EmailService.sendEmail(user.email, 'Password Reset Email', EmailService.getResetPasswordEmailBody(req.get('referer'), resetLink.token))
                        .then(() => {
                            return res.status(StatusCodes.OK).json({
                                message: "Password reset email sent"
                            })
                        })
                        .catch(() => {
                            let error_string = "An error occurred, please try again. " +
                                "If the error persists, please contact your site administrator.";
                            const error = new JailorsError(error_string, StatusCodes.UNPROCESSABLE_ENTITY);
                            next(error);
                        });
                })
                .catch(() => {
                    const error = new JailorsError("An error occurred, please try again", StatusCodes.UNAUTHORIZED);
                    next(error);
                })
        })
        .catch((err) => {
            next(err);
        })
}

/**
 * Method to handle password reset token validity request
 */
module.exports.verifyResetTokenValid = function(req, res, next) {
    const {
        body: { token },
    } = req;

    PasswordResetService.getPasswordResetLinkFromToken(token)
        .then((resetLink) => {
            if (!resetLink) {
                throw new JailorsError("This is not a valid link. Please request a new one.", StatusCodes.UNAUTHORIZED);
            }
            if (!PasswordResetService.isPasswordResetLinkValid(resetLink.tokenExpires.getTime(), resetLink.pending)) {
                throw new JailorsError("This link is no longer valid. Please request a new one.", StatusCodes.UNAUTHORIZED);
            }
            UsersService.findUserById(resetLink.user_id)
                .then((user) => {
                    if (!user) {
                        throw new JailorsError("An error occurred, please try again", StatusCodes.UNAUTHORIZED);
                    }
                    return res.status(StatusCodes.OK).json({
                        firstname: user.firstname,
                        id: user.id,
                        token: token
                    })
                })
                .catch((err) => {
                    next(err);
                })
        })
        .catch((err) => {
            next(err);
        })
}

/**
 * Method to handle actual password reset requests (final step in password reset process)
 */
module.exports.resetPasswordConfirm = function(req, res, next) {
    const {
        body: { token, password, id },
    } = req;

    PasswordResetService.getPasswordResetLinkFromToken(token)
        .then((resetLink) => {
            if (!resetLink) {
                throw new JailorsError("An error occurred, please try again", StatusCodes.UNAUTHORIZED);
            }
            if (!PasswordResetService.isPasswordResetLinkValid(resetLink.tokenExpires.getTime(), resetLink.pending)) {
                throw new JailorsError("This link is no longer valid. Please request a new one.", StatusCodes.UNAUTHORIZED);
            }
            if (resetLink.user_id.toString() != id) {
                throw new JailorsError("An error occurred, please try again", StatusCodes.UNAUTHORIZED);
            }
            UsersService.findUserById(resetLink.user_id)
                .then((user) => {
                    if (!user) {
                        throw new JailorsError("An error occurred, please try again", StatusCodes.UNAUTHORIZED);
                    }
                    UsersService.saveUserPassword(user, password)
                        .then((success) => {
                            if (!success) {
                                throw new JailorsError("An error occurred, please try again", StatusCodes.UNAUTHORIZED);
                            }
                            const responseToken = AuthService.generateJWT(user.username, user._id);
                            res.setHeader('Set-Cookie', `token=${responseToken}; HttpOnly; Secure; SameSite=None`);
                            return res.json();
                        })
                        .catch((err) => {
                            next(err);
                        })
                })
                .catch((err) => {
                    next(err);
                })
        })
        .catch((err) => {
            next(err);
        })
}