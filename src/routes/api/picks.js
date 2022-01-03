const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const RequestController = require('../../controllers/RequestController');
const DraftPicksController = require('../../controllers/DraftPicksController');
const { body } = require('express-validator');

router.post('', AuthController.verifyJWT, body(['year', 'originalTeam']).notEmpty(), 
    body(['pickingTeamName', 'pickingOwnerName', 'round', 'overall', 'contractYearsOriginal', 'contractYearsRemaining']).if(body('player').notEmpty()).notEmpty(), 
    body('status', 'Status must be a number value greater than 0 if player is specified').if(body('player').notEmpty()).isInt().custom((val) => val > 0),
    RequestController.checkValidationErrors, DraftPicksController.saveDraftPick);

module.exports = router;