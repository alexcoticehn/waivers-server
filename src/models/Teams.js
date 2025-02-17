const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define Schema
const TeamsSchema = new Schema({
    name: String,
    name_prospect: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

mongoose.model('Teams', TeamsSchema);