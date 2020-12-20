/* global require */
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SaltRounds = require("../config/passport/passport");

var Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String
});

UsersSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, SaltRounds);

    this.password = hash;
    next();
});

UsersSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        username: this.username,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret');
};

UsersSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        username: this.username,
        token: this.generateJWT()
    };
};

mongoose.model('Users', UsersSchema);
