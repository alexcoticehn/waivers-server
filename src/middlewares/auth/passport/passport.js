/* global require */
const mongoose = require('../../../config/mongoose/mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = mongoose.model('Users');

passport.use('login', new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
}, (username, password, done) => {
    Users.findOne({ username })
        .then((user) => {
            if (!user || !user.isValidPassword(password)) {
                return done(null, false, { errors: {'username or password': 'is invalid'}});
            }
            return done(null, user);
        })
        .catch((err) => {
            return done(err);
        });
}));

/* global module */
module.exports = passport;