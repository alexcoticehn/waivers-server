'use strict';

class ValidationError extends Error {
    constructor(messages, statusCode) {
        super();
        this.errors = messages;
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    ValidationError
}