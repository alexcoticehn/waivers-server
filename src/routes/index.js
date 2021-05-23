const express = require('express');
const router = express.Router();

router.use('/users', require('./api/users'));
router.use('/auth', require('./api/auth'));
router.use('/teams', require('./api/teams'));

module.exports = router;
