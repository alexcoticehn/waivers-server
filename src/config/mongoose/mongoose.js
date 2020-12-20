/*global require*/
require('dotenv').config();
const mongoose = require('mongoose');
// configure mongoose
// eslint-disable-next-line no-undef
mongoose.connect(process.env.DB_HOST_DEV + process.env.DB_NAME_DEV, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);
// eslint-disable-next-line no-undef
module.exports = mongoose;