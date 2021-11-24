const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define schema
const PicksSchema = new Schema({
  year: {
    type: Schema.Types.ObjectId,
    ref: 'Years'
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Years'
  },
  originalTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Teams'
  },
  pickingTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Teams'
  },
  pickingTeamName: String,
  pickingOwnerName: String,
  round: Number,
  overall: Number,
  contractYearsOriginal: Number,
  contractYearsRemaining: Number,
  status: String
});

mongoose.model('DraftPicks', PicksSchema);