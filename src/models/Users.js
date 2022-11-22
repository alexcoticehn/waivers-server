const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const PassportConstants = require('../constants/PassportConstants');

var Schema = mongoose.Schema;

// Define schema
const UsersSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Teams'
  },
  admin: Boolean
});

/**
 * Check if password provided is correct for given user
 * @param {string} password 
 */
UsersSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare;
}

/**
 * Save user's new password
 * @param {String} password 
 */
UsersSchema.methods.saveNewPassword = async function(password) {
    this.password = await bcrypt.hash(password, PassportConstants.SaltRounds);
    const saved_doc = await this.save();
    return this === saved_doc;
}

mongoose.model('Users', UsersSchema);
