const jwt = require('jsonwebtoken');

function getJWTSecret() {
    if (process.env.NODE_ENV == 'test') {
        return process.env.JWT_TEST_SECRET;
    } else {
        return process.env.JWT_SECRET;
    }
}

/**
 * Generate and return JWT upon successful authentication to be used for subsequent requests
 * @param {string} username 
 * @param {ObjectId} id 
 */
module.exports.generateJWT = function(username, id) {
    return jwt.sign({
        username: username,
        id: id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, getJWTSecret());
}

module.exports.decodeJWT = function(token) {
    try {
        return jwt.verify(token, getJWTSecret());
    } catch (err) {
        return false;
    }  
}

/*
const getTokenFromHeaders = (req) => {
    const { headers: { authorization }} = req;

    return authorization;
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        credentialsRequired: false
    })
};

module.exports = auth;
*/