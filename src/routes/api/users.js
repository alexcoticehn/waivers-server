/* global require */
const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../config/auth');
const Users = mongoose.model('Users');

// POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user }} = req;

    if (!user.username) {
        return res.status(422).json({
            errors: {
                username: 'is required'
            }
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        });
    }

    // eslint-disable-next-line no-unused-vars
    return passport.authenticate('local', { session: false }, (err, passportUser, _info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return status(400).info;
    })(req, res, next);
});

// GET current route (required, only authenticated users have access)
// eslint-disable-next-line no-unused-vars
router.get('/current', auth.required, (req, res, _next) => {
    const { payload: { id } } = req;

    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
});

// eslint-disable-next-line no-undef
module.exports = router;
