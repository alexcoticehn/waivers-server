const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const RequestController = require('../../controllers/RequestController');
const DraftPicksController = require('../../controllers/DraftPicksController');
const SanitizationService = require('../../services/sanitizers/SanitizationService');
const { body } = require('express-validator');

/**
 * POST route to add new prospect draft picks
 * Sample Request: 
 * {
 *      originalTeam: "61d24b1f925d775745e2f97f",
 *      year: "61d24dec70a75cbb7ff05337",
 *      pickingTeam: "61d24b1f925d775745e2f97f",
 *      round: 1,
 *      currentTeam: "61d24b1f925d775745e2f982",
 *      overall: 1,
 *      player: "61a95c978be9093a2a514563",
 *      status: 1,
 *      pickingTeamName: "Test Team Name",
 *      pickingOwnerName: "Test Name",
 *      contractYearsOriginal: 3,
 *      contractYearsRemaining: 2,
 *      timesExtended: 0
 * }
 * 
 *  Sample Response: Same as request but with _id
 */
router.post('', AuthController.verifyJWT, body(['year', 'originalTeam']).notEmpty(), 
    body(['pickingTeamName', 'pickingOwnerName', 'round', 'overall', 'contractYearsOriginal', 'contractYearsRemaining']).if(body('player').notEmpty()).notEmpty(), 
    body('status', 'Status must be a number value greater than 0 if player is specified').if(body('player').notEmpty()).isInt().custom((val) => val > 0),
    RequestController.checkValidationErrors, 
    body(['year', 'originalTeam', 'pickingTeam', 'currentTeam', 'player']).customSanitizer(val => { return SanitizationService.sanitizeObjectIdString(val) }), 
    DraftPicksController.saveDraftPick);

module.exports = router;