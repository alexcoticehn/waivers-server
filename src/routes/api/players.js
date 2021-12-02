const router = require("express").Router();
const PlayersController = require('../../controllers/PlayersController');
const AuthController = require('../../controllers/AuthController');
const { query } = require('express-validator');

router.get('', AuthController.verifyJWT, query(['firstname', 'lastname']).default('').toLowerCase(), PlayersController.searchPlayers)

module.exports = router;