const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const RequestController = require('../../controllers/RequestController');
const PasswordResetController = require('../../controllers/PasswordResetController');
const { body } = require('express-validator');

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
router.post("/login", body(['user.username', 'user.password']).notEmpty(), RequestController.checkValidationErrors, AuthController.userLogin);

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
 * POST route to check validity of password reset token
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
router.post("/reset/verify", RequestController.verifyPasswordResetTokenRequest, PasswordResetController.verifyResetTokenValid);

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

module.exports = router;
