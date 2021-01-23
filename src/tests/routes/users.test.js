const app = require('../../app');
const supertest = require("supertest");
const request = supertest(app)
const mongoose = require('mongoose');
const StatusCodes = require('../../constants/StatusCodes');
const PasswordResetService = require('../../services/auth/PasswordResetService');
const UsersService = require('../../services/users/UsersService');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST_DEV + 'waivers_users_test', { useNewUrlParser: true, useUnifiedTopology: true });
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

describe('Request Password Reset Link Tests', () => {
    test('Successful Password Reset', async () => {
        return request.put('/api/users/reset/send')
            .send({
                user: {
                    email: 'alcabc7@hotmail.com'
                }
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
            })
    })

    test('Unsuccessful Password Reset - Bad Request No User Object', async () => {
        return request.put('/api/users/reset/send')
            .send({
                email: 'alcabc7@hotmail.com'
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            })
    })

    test('Unsuccessful Password Reset - Bad Request No Email Object', async () => {
        return request.put('/api/users/reset/send')
            .send({
                user: {
                    user: 'alcabc7@hotmail.com'
                }
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            })
    })

    test('Unsuccessful Password Reset - Unauthorized Nonexistent Email', async () => {
        return request.put('/api/users/reset/send')
            .send({
                user: {
                    email: 'alhhhhh@hotmail.com'
                }
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
            })
    })
})

describe('Verify Password Reset Link Tests', () => {
    test('Valid Password Reset Link', async () => {
        const user = await UsersService.findUserByUsername('acoticehn');
        const resetLink = await PasswordResetService.createOrUpdatePasswordResetLink(user._id);
        return request.get('/api/users/reset/verify')
            .send({
                token: resetLink.token
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
            })
    })
})