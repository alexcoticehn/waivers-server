const jwt = require('jsonwebtoken');

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
    }, process.env.JWT_SECRET);
}