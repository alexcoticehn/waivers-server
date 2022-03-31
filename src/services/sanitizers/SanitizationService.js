const { ObjectId } = require('mongodb');

/**
 * 
 * @param {ObjectId} objectId 
 * @returns Returns a MongoDb ObjectId if a string is provided, undefined otherwise
 */
module.exports.sanitizeObjectIdString = function(objectId) {
    let sanitized_value;
    objectId ? sanitized_value = new ObjectId(objectId) : sanitized_value = undefined; 
    return sanitized_value;
}