const router = require("express").Router();
const AuthController = require('../../controllers/AuthController');

router.get('/teams', AuthController.verifyJWT, );