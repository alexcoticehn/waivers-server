/* global require */
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define schema
const LinksSchema = new Schema({
  token: String,
  tokenExpires: Date,
  user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
  }
});

mongoose.model('Users', LinksSchema);