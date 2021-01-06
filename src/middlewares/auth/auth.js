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