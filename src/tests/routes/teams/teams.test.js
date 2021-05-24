const app = require('../../../app');
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
const AuthService = require('../../../services/auth/AuthService');
const PassportConstants = require('../../../constants/PassportConstants');
const StatusCodes = require('../../../constants/StatusCodes');
const crypto = require('crypto');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST_DEV + 'jailors_teams_test', { useNewUrlParser: true, useUnifiedTopology: true });
})

afterAll(async () => {
    await mongoose.disconnect();
})

describe('Get All Teams Tests', () => {
    test('Get All Teams Successfully', async () => {
        const token = AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));
        return request.get('/jailors/api/teams')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.teams.length).toBe(10);
            })
    })
})