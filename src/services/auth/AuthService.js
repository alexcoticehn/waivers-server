const jwt = require('jsonwebtoken');
const PassportConstants = require('../../constants/PassportConstants');

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

/**
 * Decode given jwt. Returns decoded token if token is valid and false if token is invalid.
 * Currently only used for testing purposes, maybe move from this class?
 * @param {string} token 
 */
module.exports.decodeJWT = function(token) {
    try {
        return jwt.verify(token, getJWTSecret());
    } catch (err) {
        return false;
    }  
}

/**
 * Get JWT From cookies for authorization check
 * @param {*} req 
 */
module.exports.getJWTFromRequestCookie = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[PassportConstants.TokenCookie]
    }
    return token;
}