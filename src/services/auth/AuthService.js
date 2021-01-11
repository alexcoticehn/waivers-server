module.exports.getJWTSecret = function() {
    if (process.env.NODE_ENV == 'test') {
        return process.env.JWT_TEST_SECRET;
    } else {
        return process.env.JWT_SECRET;
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