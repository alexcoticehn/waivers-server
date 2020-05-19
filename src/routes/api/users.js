/* global require */
const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../../middlewares/auth");
const Users = mongoose.model("Users");
const status_codes = require("../status_codes");

// POST login route (optional, everyone has access)
router.post("/login", auth.optional, (req, res, next) => {
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
  return passport.authenticate("local", { session: false }, (err, passportUser, _info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return res.status(status_codes.BAD_REQUEST).json({
        errors: {
          password: "is incorrect",
        },
      });
    }
  )(req, res, next);
});

// GET current user route (required, only authenticated users have access)
// eslint-disable-next-line no-unused-vars
router.get("/current", auth.required, (req, res, _next) => {
  const { payload: { id } } = req;

  return Users.findById(id).then((user) => {
    if (!user) {
      return res.sendStatus(status_codes.BAD_REQUEST);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

// PATCH reset password route (required, only authenticated users have access)
// eslint-disable-next-line no-unused-vars
router.patch("/resetpassword", auth.required, (req, res, _next) => {
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
