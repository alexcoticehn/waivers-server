/* global require */
const mongoose = require('../../../config/mongoose/mongoose.config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = mongoose.model('Users');

passport.use('login', new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
}, (username, password, done) => {
    Users.findOne({ username })
        .then(async (user) => {
            if (!user) {
                return done(null, false, { errors: {'username or password': 'is invalid'}});
            }

            const valid_password = await user.isValidPassword(password);
            if (!valid_password) {
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