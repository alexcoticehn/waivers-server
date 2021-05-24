const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const TeamsController = require('../../controllers/TeamsController');

/**
 * GET request to return all teams and info, but not rosters
 */
router.get('', AuthController.verifyJWT, TeamsController.getTeams);

module.exports = router;