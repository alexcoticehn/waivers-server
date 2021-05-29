const mongoose = require('mongoose');
const Years = mongoose.model('Years');

module.exports.getAllYears = async function() {
    return await Years.find({});
}