const app = require('../../../app');
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
const StatusCodes = require('../../../constants/StatusCodes');

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