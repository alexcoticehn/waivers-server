const AuthService = require('../../services/auth/AuthService');
const crypto = require('crypto');

test('Valid Token Test', () => {
    crypto.randomBytes(24).toString('hex');
    const token = AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));
    const decoded = AuthService.decodeJWT(token);
    expect(decoded.expiresIn).toBe('1 week');
    expect(decoded.username).toBe('alex');
})