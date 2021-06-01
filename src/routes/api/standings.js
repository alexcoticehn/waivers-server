const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const StandingsController = require('../../controllers/StandingsController');

/**
 * GET request to return all standings info for given year and/or team
 * Sample response:
 * {
 *   standings: [
 *     {
 *       team: "tg45g5wby",
 *       year: "54g6byeh",
 *       position: 1,
 *       points: 82
 *     }
 *   ]
 * }
 */
router.get('', AuthController.verifyJWT, StandingsController.getStandings);

module.exports = router;