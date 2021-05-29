const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const TeamsController = require('../../controllers/TeamsController');

/**
 * GET request to return all teams and info, but not rosters
 * Sample response: 
 * {
 *   teams: [
 *      {
 *         _id: "5tgre66g6h",
 *         name: "Don't Toews Me, Bro"
 *         owner: {
 *           _id: "5geh6h",
 *           firstname: "Alex"
 *           lastname: "Cotic-Ehn"
 *         }
 *         name_prospect: "Kazakh Politics"
 *      }
 *   ]
 * }
 */
router.get('', AuthController.verifyJWT, TeamsController.getTeams);

module.exports = router;