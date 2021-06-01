const express = require('express');
const router = express.Router();

router.use('/users', require('./api/users'));
router.use('/auth', require('./api/auth'));
router.use('/teams', require('./api/teams'));
router.use('/standings', require('./api/standings'));
router.use('/years', require('./api/years'));

module.exports = router;
