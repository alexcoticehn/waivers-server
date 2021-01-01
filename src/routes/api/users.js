const mongoose = require("../../config/mongoose/mongoose");
const router = require("express").Router();
const auth = require("../../middlewares/auth/auth");
const UsersController = require('../../controllers/UsersController');
const Users = mongoose.model("Users");
const createPasswordResetLink = require('../../middlewares/auth/users/passwordReset');
const status_codes = require("../statusCodes");

// POST login route (optional, everyone has access)
router.post("/login", UsersController.handleLoginRequest(req, res, next));

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
router.patch("/reset/password", auth.required, (req, res) => {
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

module.exports = router;
