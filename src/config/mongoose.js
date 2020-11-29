/*global require*/
const mongoose = require('mongoose');
// configure mongoose
mongoose.connect('mongodb://localhost:27017/waivers_local', { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log("connection successful") },
    // eslint-disable-next-line no-unused-vars
    _err => { console.log("connection failed") }
);
mongoose.set('debug', true);
// eslint-disable-next-line no-undef
module.exports = mongoose;