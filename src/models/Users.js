/* global require */
/* global process */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
    const user = this;
    const hash = await bcrypt.hash(user.password, SaltRounds);

    this.password = hash;
    next();
});

/**
 * Check if password provided is correct for given user
 * @param {string} password 
 */
UsersSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

/**
 * Generate and return json web token when user is logged in
 * JWT to be used to for future requests
 */
UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        username: this.username,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, process.env.JWT_SECRET);
};

mongoose.model('Users', UsersSchema);
