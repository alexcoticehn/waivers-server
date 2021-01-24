const app = require('../../app');
const supertest = require("supertest");
const request = supertest(app)
const mongoose = require('mongoose');
const crypto = require('crypto');
const StatusCodes = require('../../constants/StatusCodes');
const PasswordResetService = require('../../services/auth/PasswordResetService');
const UsersService = require('../../services/users/UsersService');
const PasswordResetConstants = require('../../constants/PasswordResetConstants');
const { ObjectId } = require('mongodb');
const PasswordResetLinks = mongoose.model('PasswordResetLinks');

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
    test('Successful Password Reset Request', async () => {
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
        await PasswordResetLinks.deleteMany({});
        const user = await UsersService.findUserByUsername('acoticehn');
        const resetLink = await PasswordResetService.createOrUpdatePasswordResetLink(user._id);
        return request.get('/api/users/reset/verify')
            .send({
                token: resetLink.token
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.id).toBe(user.id);
                expect(res.body.token).toBe(resetLink.token);
                expect(res.body.firstname).toBe(user.firstname);
            })
    })

    test('Expired Password Reset Link - Time Expired', async () => {
        await PasswordResetLinks.deleteMany({});
        const user = await UsersService.findUserByUsername('acoticehn');
        const token = crypto.randomBytes(20).toString('hex');
        const expiredResetLink = {
            token: token,
            tokenExpires: Date.now() - 3600000,
            pending: PasswordResetConstants.StatusPending,
            user_id: user._id
        }
        await PasswordResetLinks.create(expiredResetLink);
        return request.get('/api/users/reset/verify')
            .send({
                token: token
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
                expect(res.body.errors.message).toBe(
                    'This link is no longer valid. Please request a new one.'
                );
            })
    })

    test('Expired Password Reset Link - Already Used (No Longer Pending)', async () => {
        await PasswordResetLinks.deleteMany({});
        const user = await UsersService.findUserByUsername('acoticehn');
        const token = crypto.randomBytes(20).toString('hex');
        const expiredResetLink = {
            token: token,
            tokenExpires: Date.now() + 3600000,
            pending: PasswordResetConstants.StatusUsed,
            user_id: user._id
        }
        await PasswordResetLinks.create(expiredResetLink);
        return request.get('/api/users/reset/verify')
            .send({
                token: token
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
                expect(res.body.errors.message).toBe(
                    'This link is no longer valid. Please request a new one.'
                );
            })
    })

    test('Password Reset Link Invalid - Does Not Exist', async () => {
        return request.get('/api/users/reset/verify')
            .send({
                token: crypto.randomBytes(20).toString('hex')
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
                expect(res.body.errors.message).toBe(
                    'An error occurred, please try again'
                );
            })
    })

    test('Password Reset Link Invalid - No Valid User Attached', async () => {
        await PasswordResetLinks.deleteMany({});
        const token = crypto.randomBytes(20).toString('hex');
        const expiredResetLink = {
            token: token,
            tokenExpires: Date.now() + 3600000,
            pending: PasswordResetConstants.StatusPending,
            user_id: new ObjectId(crypto.randomBytes(12).toString('hex'))
        }
        await PasswordResetLinks.create(expiredResetLink);
        return request.get('/api/users/reset/verify')
            .send({
                token: token
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
                expect(res.body.errors.message).toBe(
                    'An error occurred, please try again'
                );
            })
    })

    test('Invalid Request - No Token Supplied', async () => {
        return request.get('/api/users/reset/verify')
            .send({
                bad_key: '435ng45wt45t5'
            })
            .then((res) => {
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            })
    })
})