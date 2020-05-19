/* global require */
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: String,
  first_name: String,
  last_name: String,
  password: String
});

UsersSchema.methods.validatePassword = function(password) {
    return this.password === password;
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
