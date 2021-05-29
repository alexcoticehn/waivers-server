const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const YearsController = require('../../controllers/YearsController');

/**
 * GET request to return all years with start and end dates
 * Sample response: 
 * {
 *   years: [
 *     {
 *        _id: "5wty6hw65h",
 *        startDate: 2013-10-05
 *        endDate: 2014-04-12
 *     }
 *   ]
 * }
 */
router.get('', AuthController.verifyJWT, YearsController.getYears);

module.exports = router;