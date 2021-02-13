const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const UsersService = require('../users/UsersService');
const AuthService = require('../auth/AuthService');

/**
 * Local strategy used for basic login
 */
passport.use('login', new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
}, (username, password, done) => {
    UsersService.findUserByUsername(username)
        .then(async (user) => {
            if (!user) {
                return done("Username or password is incorrect", false);
            }

            const valid_password = await user.isValidPassword(password);
            if (!valid_password) {
                return done("Username or password is incorrect", false);
            }
            return done(null, user);
        })
        .catch(() => {
            return done("An error occurred, please try again.", false);
        });
}));

/**
 * JWT strategy for requests made to endpoints where authorization is required
 */
passport.use(new JWTStrategy({
    jwtFromRequest: AuthService.getJWTFromRequestCookie,
    secretOrKey: process.env.NODE_ENV === 'test' ? process.env.JWT_TEST_SECRET : process.env.JWT_SECRET
}, (jwt_payload, done) => {
    done(null, jwt_payload.id);
}))

module.exports = passport;