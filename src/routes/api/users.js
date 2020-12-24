/* global require */
const mongoose = require("../../config/mongoose/mongoose");
const passport = require("../../middlewares/auth/passport/passport");
const router = require("express").Router();
const auth = require("../../middlewares/auth/auth");
const Users = mongoose.model("Users");
const createPasswordResetLink = require('../../middlewares/auth/users/passwordReset');
const status_codes = require("../status_codes");

// POST login route (optional, everyone has access)
router.post("/login", (req, res, next) => {
  const {
    body: { user },
  } = req;

  if (!user.username) {
    return res.status(status_codes.UNPROCESSABLE_ENTITY).json({
      errors: {
        username: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(status_codes.UNPROCESSABLE_ENTITY).json({
      errors: {
        password: "is required",
      },
    });
  }

  // eslint-disable-next-line no-unused-vars
  return passport.authenticate('login', { session: false }, (err, passportUser, _info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const token = passportUser.generateJWT();

        return res.json({ token });
      }

      if (_info.errors) {
        return res.status(status_codes.UNAUTHORIZED).json({
          errors: _info.errors
        })
      }
    }
  )(req, res, next);
});

// POST route to create and send password reset link
router.put('/reset/send', (req, res) => {
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(status_codes.UNPROCESSABLE_ENTITY).json({
      errors: {
        email: "is required",
      },
    });
  }

  Users.findOne({email: user.email})
    .then((user) => {
      if (!user) {
        return res.status(status_codes.UNAUTHORIZED).json({
          errors: {
            email: "is not associated with an account"
          }
        })
      }

      createPasswordResetLink(user._id)
        .then(() => {
          return res.status(status_codes.OK).json({
            message: "Password reset email created"
          });
        }).catch();
    })
})

// PATCH reset password route (required, only authenticated users have access)
// eslint-disable-next-line no-unused-vars
router.patch("/reset/password", auth.required, (req, res, _next) => {
  const { body: { user } } = req;

  let new_password = user.new_password;

  if (!new_password) {
    return res.status(status_codes.UNPROCESSABLE_ENTITY).json({
      errors: {
        new_password: "is required",
      },
    });
  }

  Users.findById(user.id)
    .then((found_user) => {
      if (!found_user) {
        return res.status(status_codes.NOT_FOUND).json({
          errors: {
            user: "not found",
          },
        });
      }

      found_user.password = new_password;
      found_user.save();

      return res.sendStatus(status_codes.OK);
    }).catch((err) => {
        return res.status(status_codes.NOT_FOUND).json(err);
    })
});

// eslint-disable-next-line no-undef
module.exports = router;
