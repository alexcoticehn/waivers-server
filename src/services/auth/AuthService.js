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
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return await jwt.sign({
        username: username,
        id: id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, getJWTSecret());
}

module.exports.verifyJWT = async function() {

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