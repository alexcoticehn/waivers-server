const Passport = require('../middlewares/auth/passport/passportMiddleware');
const StatusCodes = require('../routes/statusCodes');
const PasswordReset = require('../middlewares/auth/users/PasswordResetMiddleware');
const UsersMiddleware = require('../middlewares/users/UsersMiddleware');
const EmailMiddleware = require('../middlewares/email/EmailMiddleware');

/**
 * Method to handle login requests
 */
module.exports.userLogin = function(req, res, next) {
    const {
        body: { user },
    } = req;

    if (!user.username) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: {
                username: "is required",
            },
        });
    }

    if (!user.password) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        errors: {
            password: "is required",
        },
        });
    }

  // eslint-disable-next-line no-unused-vars
    return Passport.authenticate('login', { session: false }, (err, passportUser, _info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const token = passportUser.generateJWT();
            return res.json({ token });
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

    if (!user.email) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        errors: {
            email: "is required",
        },
        });
    }

    UsersMiddleware.findUserByEmail(user.email)
        .then((user) => {
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    errors: {
                        email: "is not associated with an account"
                    }
                })
            }

            PasswordReset.createOrUpdatePasswordResetLink(user._id)
                .then((resetLink) => {
                    EmailMiddleware.sendEmail(user.email, 'Password Reset Email', resetLink.token)
                        .then(() => {
                            return res.status(StatusCodes.OK).json({
                            message: "Password reset email sent"
                        })
                    });
                })
        })
}