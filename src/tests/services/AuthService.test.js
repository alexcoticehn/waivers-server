const AuthService = require('../../services/auth/AuthService');
const crypto = require('crypto');

test('GenerateJWT Test', async () => {
    crypto.randomBytes(24).toString('hex')
    const token = await AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));
    const decoded = await AuthService.decodeJWT(token);
    expect(decoded.expiresIn).toBe('1 week');
    expect(decoded.username).toBe('alex');
})