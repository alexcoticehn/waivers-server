const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define Schema
const StandingsSchema = new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Teams'
    },
    year: {
        type: Schema.Types.ObjectId,
        ref: 'Years'
    },
    position: Number,
    points: Number
})

mongoose.model('Standings', StandingsSchema);