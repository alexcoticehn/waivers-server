const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define Schema
const PlayersSchema = new Schema({
    firstname: String,
    lastname: String,
    nhl_id: Number
})

mongoose.model('Players', PlayersSchema);