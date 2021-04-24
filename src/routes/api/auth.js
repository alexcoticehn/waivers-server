const router = require("express").Router();
const StatusCodes = require("../../constants/StatusCodes");
const AuthController = require("../../controllers/AuthController")

/**
 * GET route to verify if a user's token is still valid
 */
router.get("/token/verify", AuthController.verifyJWT, (req, res, _next) => {
    return res.status(StatusCodes.OK).json();
});

module.exports = router;