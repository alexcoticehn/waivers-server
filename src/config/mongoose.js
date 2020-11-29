/*global require*/
const mongoose = require('mongoose');
// configure mongoose
mongoose.connect('mongodb://localhost:27017/waivers_local', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);
// eslint-disable-next-line no-undef
module.exports = mongoose;