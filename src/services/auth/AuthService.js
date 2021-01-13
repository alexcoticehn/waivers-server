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
module.exports.generateJWT = async function(username, id) {
    return await jwt.sign({
        username: username,
        id: id,
        expiresIn: '1 week'
    }, getJWTSecret());
}

module.exports.decodeJWT = async function(token) {
    return jwt.verify(token, getJWTSecret());      
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