const router = require("express").Router();
const UsersController = require('../../controllers/UsersController');
const RequestController = require('../../controllers/RequestController');
const PasswordResetController = require('../../controllers/PasswordResetController');
const StatusCodes = require("../../constants/StatusCodes");

/**
 * POST route to process login requests
 * Sample request:
 * {
 *  user: {
 *    username: ...
 *    password: ...
 *  }
 * }
 * 
 * Sample response: (empty) Sets httpOnly cookie with JWT
 * {
 * }
 */ 
router.post("/login", RequestController.verifyLoginRequest, UsersController.userLogin);

/**
 * POST route to create and send password reset link
 * Sample request: 
 * {
 *  user: {
 *    email: ...
 *  }
 * }
 * 
 * Sample response: 
 * {
 *  message: "Password reset email sent"
 * }
 */
router.put('/reset/send', RequestController.verifyPasswordResetRequest, PasswordResetController.sendResetEmail);

/**
 * GET route to check validity of password reset token
 * Sample request:
 * {
 *  token: ...
 * }
 * 
 * Sample response:
 * {
 *  firstname: ...
 *  id: ...
 *  token: ...
 * }
 */
router.get("/reset/verify", RequestController.verifyPasswordResetTokenRequest, PasswordResetController.verifyResetTokenValid);

/**
 * PATCH route to reset a user's password
 * Sample request:
 * {
 *  token: ...
 *  id: ...
 *  password: ...
 * }
 * 
 * Sample response: (empty), Sets httpOnly cookie with JWT
 * {
 *  
 * }
 */
router.patch("/reset/confirm", RequestController.verifyPasswordResetConfirmationRequest, PasswordResetController.resetPasswordConfirm);

/**
 * GET route to verify if a user's token is still valid
 */
router.get("/token/verify", UsersController.verifyJWT, (req, res, _next) => {
    return res.status(StatusCodes.OK).json();
});

module.exports = router;
