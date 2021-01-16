const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsersService = require('../users/UsersService');

passport.use('login', new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
}, (username, password, done) => {
    UsersService.findUserByUsername(username)
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

module.exports = passport;