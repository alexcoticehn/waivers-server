const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define Schema
const StandingsSchema = new Schema({
    team_id: {
        type: Schema.Types.ObjectId,
        ref: 'Teams'
    },
    year_id: {
        type: Schema.Types.ObjectId,
        ref: 'Years'
    },
    position: Number,
    points: Number
})

mongoose.model('Standings', StandingsSchema);