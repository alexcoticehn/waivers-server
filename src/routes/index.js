const express = require('express');
const router = express.Router();

router.use('/users', require('./api/users'));
router.use('/auth', require('./api/auth'));

module.exports = router;
