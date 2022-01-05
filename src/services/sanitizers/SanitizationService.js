const { ObjectId } = require('mongodb');

module.exports.sanitizeObjectIdString = function(objectId) {
    let sanitized_value;
    objectId ? sanitized_value = new ObjectId(objectId) : sanitized_value = undefined; 
    return sanitized_value;
}