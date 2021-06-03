const app = require('../../../app');
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
const AuthService = require('../../../services/auth/AuthService');
const PassportConstants = require('../../../constants/PassportConstants');
const StatusCodes = require('../../../constants/StatusCodes');
const crypto = require('crypto');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST_DEV + 'jailors_standings_test', { useNewUrlParser: true, useUnifiedTopology: true });
})

afterAll(async () => {
    await mongoose.disconnect();
})

describe('Get Standings Tests', () => {
    const token = AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));

    test('Get All Standings', async () => {
        return request.get('/jailors/api/standings')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.standings.length).toBe(20);
            })
    })

    test('Get Standings By Year', async () => {
        return request.get('/jailors/api/standings?year=60b6fc74f58db314b61191ce')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.standings.length).toBe(10);
                res.body.standings.forEach(element => {
                    expect(element.position).toBeGreaterThanOrEqual(1);
                    expect(element.position).toBeLessThanOrEqual(10);
                })
            })
    })

    test('Get Standings By Team', async () => {
        return request.get('/jailors/api/standings?team=60b6fcebc276051573dbb432')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.standings.length).toBe(2);
                res.body.standings.forEach(element => {
                    expect([1,7]).toContain(element.position);
                    expect([81,49]).toContain(element.points);
                });
            })
    })

    test('Get Standings By Team and Year', async () => {
        return request.get('/jailors/api/standings?team=60b6fcebc276051573dbb432&year=60b6fc74f58db314b61191ce')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.standings.position).toBe(1);
                expect(res.body.standings.points).toBe(81);
            })
    })
})

describe('Get Standings Failed', () => {
    test('Unauthorized', async () => {
        return request.get('/jailors/api/standings')
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
            })
    })
})