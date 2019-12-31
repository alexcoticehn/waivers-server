/* global require */
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));

// eslint-disable-next-line no-undef
module.exports = router;
