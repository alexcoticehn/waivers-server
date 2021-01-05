const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SaltRounds = require("../config/passport/passport");

var Schema = mongoose.Schema;

// Define schema
const UsersSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

/**
 * Prior to saving user, hash password
 */
UsersSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, SaltRounds);

    this.password = hash;
    next();
});

/**
 * Check if password provided is correct for given user
 * @param {string} password 
 */
UsersSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare;
}

mongoose.model('Users', UsersSchema);
