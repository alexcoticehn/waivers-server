/* global require */
const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization }} = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false
    })
};

// eslint-disable-next-line no-undef
module.exports = auth;