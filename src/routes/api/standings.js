const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const StandingsController = require('../../controllers/StandingsController');

router.get('', AuthController.verifyJWT, StandingsController.getStandings);

module.exports = router;