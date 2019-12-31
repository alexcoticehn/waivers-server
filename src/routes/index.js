/* global require */
const express = require('express');
const router = express.Router();

router.use('/users', require('./api/users'));

// eslint-disable-next-line no-undef
module.exports = router;
