const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define Schema
const PlayersSchema = new Schema({
    fullname: String,
    nhl_id: Number
})

mongoose.model('Players', PlayersSchema);