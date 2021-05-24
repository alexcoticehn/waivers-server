const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define Schema
const YearsSchema = new Schema({
    startDate: Date,
    endDate: Date
});

mongoose.model('Years', YearsSchema);