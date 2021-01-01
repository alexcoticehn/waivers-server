const Passport = require('../middlewares/auth/passport/passport');
const StatusCodes = require('../routes/statusCodes');

/**
 * Method to handle login requests
 */
module.exports.userLoginPost = function(req, res, next) {
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
    }
  )(req, res, next);
}