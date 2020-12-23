/* global require */
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define schema
const LinksSchema = new Schema({
  token: String,
  user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
  },
  tokenExpires: Date
});