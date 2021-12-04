const app = require('../../../app');
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
const PassportConstants = require('../../../constants/PassportConstants');
const AuthService = require('../../../services/auth/AuthService');
const StatusCodes = require('../../../constants/StatusCodes');
const crypto = require('crypto');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST_DEV + 'jailors_players_test', { useNewUrlParser: true, useUnifiedTopology: true });
})

afterAll(async () => {
    await mongoose.disconnect();
})

describe('Search Players Tests', () => {
    const token = AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));

    test('Get All Players', async () => {
        return request.get('/jailors/api/players')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.players).toHaveLength(50);
            })
    })

    test('Get Jonathan Bernier Upper and Lowercase', async () => {
        return request.get('/jailors/api/players?firstname=JonAthan&lastname=BerNier')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.players).toHaveLength(1);
                expect(res.body.players[0].firstname).toBe('Jonathan');
                expect(res.body.players[0].lastname).toBe('Bernier');
            })
    })

    test('Get All Players with First Name Andy', async () => {
        return request.get('/jailors/api/players?firstname=Andy')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.players).toHaveLength(2);
                expect(['Greene', 'Andreoff']).toContain(res.body.players[0].lastname);
                expect(['Greene', 'Andreoff']).toContain(res.body.players[1].lastname);
            })
    })

    test('Get All Players with Last Name containing ar', async () => {
        return request.get('/jailors/api/players?lastname=ar')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.players).toHaveLength(8);
            })
    })

    test('Get P.K. Subban', async () => {
        return request.get('/jailors/api/players?firstname=P.K.')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({})
            .then((res) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body.players).toHaveLength(1);
                expect(res.body.players[0]).toHaveProperty('firstname', 'P.K.');
                expect(res.body.players[0]).toHaveProperty('lastname', 'Subban');
            })
    })
})