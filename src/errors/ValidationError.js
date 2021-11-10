'use strict';

class ValidationError extends Error {
    constructor(messages, statusCode) {
        super();
        this.errors = messages;
        this.status = statusCode;
        this.message = "A validation error occurred. See details under errors."
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    ValidationError
}