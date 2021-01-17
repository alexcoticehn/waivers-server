const app = require('../../app');
const supertest = require("supertest");
const request = supertest(app)

describe('Login Tests', () => {
    test('Successful Login Test', async () => {
        return request
            .post('/api/users/login')
            .send({
                "user": {
                    "username": 'dfilipovic',
                    "password": '123456789'
                }
            })
            .then((res) => {
                expect(res.status).toBe(200);
            });
    })

    test('Unsuccessful Login Test', async () => {
        return request
            .post('/api/users/login')
            .send({
                "user": {
                    "username": 'dfilipovic',
                    "password": '435345'
                }
            })
            .then((res) => {
                expect(res.status).toBe(401);
            });
    })
});