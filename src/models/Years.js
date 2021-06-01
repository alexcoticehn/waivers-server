const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define Schema
const YearsSchema = new Schema({
    startDate: Date,
    endDate: Date
});

YearsSchema.set('toJSON', { versionKey: false });

mongoose.model('Years', YearsSchema);