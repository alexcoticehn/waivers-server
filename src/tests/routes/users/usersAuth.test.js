const app = require('../../../app');
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
const StatusCodes = require('../../../constants/StatusCodes');
const AuthService = require('../../../services/auth/AuthService');
const jwt = require('jsonwebtoken');
const PassportConstants = require('../../../constants/PassportConstants');
const crypto = require('crypto');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST_DEV + 'jailors_users_test', { useNewUrlParser: true, useUnifiedTopology: true });
})

afterAll(async () => {
    await mongoose.disconnect();
})

describe('Login Tests', () => {
    test('Successful Login Test', async () => {
        return request.post('/api/users/login')
            .send({
                user: {
                    username: 'dfilipovic',
                    password: '123456789'
                }
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
            });
    })

    test('Unsuccessful Login Test - Incorrect Password', async () => {
        return request.post('/api/users/login')
            .send({
                user: {
                    username: 'dfilipovic',
                    password: '435345'
                }
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
            });
    })

    test('Unsuccessful Login Test - Incorrect Username', async () => {
        return request.post('/api/users/login')
            .send({
                user: {
                    username: 'bad_username',
                    password: '435345'
                }
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
            });
    })

    test('Unsuccessful Login - Bad Request Format No User Object', async () => {
        return request.post('/api/users/login')
            .send({
                username: 'bad_username',
                password: '435345' 
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            });
    })

    test('Unsuccessful Login - Bad Request Format No Username', async () => {
        return request.post('/api/users/login')
            .send({
                user: {
                    password: '123456789'
                }
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            })
    })

    test('Unsuccessful Login - Bad Request Format No Password', async () => {
        return request.post('/api/users/login')
            .send({
                user: {
                    username: 'acoticehn'
                }
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            })
    })
});

describe('JWT Verification Tests', () => {
    test('Valid Token Test', () => {
        const token = AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));
        return request.get('/api/auth/token/verify')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
            })
    })

    test('Invalid Token Test - Expired', () => {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) - (60 * 60),
            id: crypto.randomBytes(24).toString('hex'),
            username: 'alex'
        }, process.env.JWT_TEST_SECRET);
        return request.get('/api/auth/token/verify')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
            })
    })

    test('Invalid Token Test - Bad Secret', () => {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: crypto.randomBytes(24).toString('hex'),
            username: 'alex'
        }, "BAD_SECRET");
        return request.get('/api/auth/token/verify')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
            })
    })

    test('Invalid Token Test - Missing Cookie', () => {
        return request.get('/api/auth/token/verify')
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
            })
    })
})