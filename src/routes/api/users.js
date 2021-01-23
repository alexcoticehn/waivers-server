const router = require("express").Router();
const UsersController = require('../../controllers/UsersController');
const RequestController = require('../../controllers/RequestController');
const PasswordResetController = require('../../controllers/PasswordResetController');

// POST route to process login requests
router.post("/login", RequestController.verifyLoginRequest, UsersController.userLogin);

// POST route to create and send password reset link
router.put('/reset/send', RequestController.verifyPasswordResetRequest, PasswordResetController.sendResetEmail);

// GET route to check validity of password reset token
router.get("/reset/verify", RequestController.verifyPasswordResetTokenRequest, PasswordResetController.verifyResetTokenValid);

// PATCH reset password route (required, only authenticated users have access) commented out for now
/*
router.patch("/reset/password", Auth.required, (req, res) => {
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
*/

module.exports = router;
