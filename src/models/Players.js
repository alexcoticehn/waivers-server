const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define Schema
const PlayersSchema = new Schema({
    firstname: String,
    lastname: String,
    nhl_id: {type: Number, default: null},
    prospect_id: {type: Number, default: null}
})

mongoose.model('Players', PlayersSchema);