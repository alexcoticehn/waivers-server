const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');
const YearsController = require('../../controllers/YearsController');

router.get('', AuthController.verifyJWT, YearsController.getYears);

module.exports = router;