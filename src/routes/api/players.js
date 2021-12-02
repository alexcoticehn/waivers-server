const router = require("express").Router();
const PlayersController = require('../../controllers/PlayersController');
const AuthController = require('../../controllers/AuthController');
const { query } = require('express-validator');

/**
 * GET request to return players for given first and last name search
 * Sample response:
 * {
 *   players: [
 *     {
 *       _id: "56457mnvy56yv6vm6y",
 *       nhl_id: 435345,
 *       prospect_id: 45435,
 *       firstname: "Henrik",
 *       lastname: "Sedin"
 *     }
 *   ]
 * }
 */
router.get('', AuthController.verifyJWT, query(['firstname', 'lastname']).default('').toLowerCase(), PlayersController.searchPlayers)

module.exports = router;