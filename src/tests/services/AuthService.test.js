const AuthService = require('../../services/auth/AuthService');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

describe('JWT Tests', () => {
    test('Valid Token Test', () => {
        const token = AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));
        const decoded = AuthService.decodeJWT(token);
        expect(decoded.username).toBe('alex');
    })

    test('Invalid Token Test - Expired', () => {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) - (60 * 60),
            id: crypto.randomBytes(24).toString('hex'),
            username: 'alex'
        }, process.env.JWT_TEST_SECRET);
        expect(AuthService.decodeJWT(token)).toBe(false);
    })

    test('Invalid Token Test - Bad Secret', () => {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: crypto.randomBytes(24).toString('hex'),
            username: 'alex'
        }, "BAD_SECRET");
        expect(AuthService.decodeJWT(token)).toBe(false);
    })
})