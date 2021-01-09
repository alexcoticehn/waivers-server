const { ObjectID } = require('mongodb');
const LoginMiddleware = require('../../middlewares/auth/users/LoginMiddleware');

test('GenerateJWT Test', () => {
    const token = LoginMiddleware.generateJWT('alex', '777777777777777777777777');
})