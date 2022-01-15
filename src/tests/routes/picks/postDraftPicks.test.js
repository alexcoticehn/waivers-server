const app = require('../../../app');
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose');
const AuthService = require('../../../services/auth/AuthService');
const PassportConstants = require('../../../constants/PassportConstants');
const StatusCodes = require('../../../constants/StatusCodes');
const crypto = require('crypto');
const DraftPicks = mongoose.model("DraftPicks");

beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST_DEV + 'jailors_players_test', { useNewUrlParser: true, useUnifiedTopology: true });
    await DraftPicks.deleteMany({});
})

afterAll(async () => {
    await mongoose.disconnect();
})

describe('Post Draft Picks Invalid Request Tests', () => {
    const token = AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));

    test('Invalid Request - Missing Year', async () => {
        request.post('/jailors/api/picks')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({
                originalTeam: "61d24b1f925d775745e2f97f"
            })
            .then((res) => {
                expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
            })
    })

    test('Invalid Request - Missing Round', async () => {
        request.post('/jailors/api/picks')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({
                originalTeam: "61d24b1f925d775745e2f97f",
                year: "61d24dec70a75cbb7ff05337",
                player: "61a95c978be9093a2a514562",
                pickingTeamName: "Test Team Name",
                pickingOwnerName: "Test Owner Name",
                overall: 23,
                contractYearsOriginal: 3,
                contractYearsRemaining: 0,
                status: 1
            })
            .then((res) => {
                expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
                expect(res.body.errors).toHaveLength(1);
            })
    })

    test('Invalid Request - Bad Status Value', async () => {
        request.post('/jailors/api/picks')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({
                originalTeam: "61d24b1f925d775745e2f97f",
                year: "61d24dec70a75cbb7ff05337",
                player: "61a95c978be9093a2a514562",
                pickingTeamName: "Test Team Name",
                pickingOwnerName: "Test Owner Name",
                overall: 23,
                contractYearsOriginal: 3,
                contractYearsRemaining: 0,
                round: 3,
                status: 0
            })
            .then((res) => {
                expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
                expect(res.body.errors).toHaveLength(1);
                expect(res.body.errors[0].msg).toBe('Status must be a number value greater than 0 if player is specified');
            })
    })

    test('Invalid Request - Multiple Validation Errors', async () => {
        request.post('/jailors/api/picks')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({
                originalTeam: "61d24b1f925d775745e2f97f",
                year: "61d24dec70a75cbb7ff05337",
                player: "61a95c978be9093a2a514562",
                pickingTeamName: "Test Team Name",
                pickingOwnerName: "Test Owner Name",
                overall: 23,
                contractYearsOriginal: 3,
                status: 1
            })
            .then((res) => {
                expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
                expect(res.body.errors).toHaveLength(2);
            })
    })
})

describe('Post Draft Picks Valid Request Tests', () => {
    const token = AuthService.generateJWT('alex', crypto.randomBytes(24).toString('hex'));

    test('Valid Request - Minimum Provided Data', async () => {
       return request.post('/jailors/api/picks')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({
                originalTeam: "61d24b1f925d775745e2f97f",
                year: "61d24dec70a75cbb7ff05337",
            })
            .then(async (res) => {
                expect(res.statusCode).toBe(StatusCodes.OK);
                expect(res.body.pick.year).toBe("61d24dec70a75cbb7ff05337");
                expect(res.body.pick.originalTeam).toBe("61d24b1f925d775745e2f97f");
                const pick = await DraftPicks.findById(res.body.pick._id);
                expect(pick.year.toString()).toBe("61d24dec70a75cbb7ff05337");
                expect(pick.originalTeam.toString()).toBe("61d24b1f925d775745e2f97f");
            }) 
    })
    test('Valid Request - Maximum Provided Data', async () => {
       return request.post('/jailors/api/picks')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({
                originalTeam: "61d24b1f925d775745e2f97f",
                year: "61d24dec70a75cbb7ff05337",
                pickingTeam: "61d24b1f925d775745e2f97f",
                round: 1,
                currentTeam: "61d24b1f925d775745e2f982",
                overall: 1,
                player: "61a95c978be9093a2a514563",
                status: 1,
                pickingTeamName: "Test Team Name",
                pickingOwnerName: "Test Name",
                contractYearsOriginal: 3,
                contractYearsRemaining: 2,
                timesExtended: 0
            })
            .then(async (res) => {
                expect(res.statusCode).toBe(StatusCodes.OK);
                expect(res.body.pick.year).toBe("61d24dec70a75cbb7ff05337");
                expect(res.body.pick.originalTeam).toBe("61d24b1f925d775745e2f97f");
                const pick = await DraftPicks.findById(res.body.pick._id);
                expect(pick.pickingTeam.toString()).toBe("61d24b1f925d775745e2f97f");
                expect(pick.contractYearsOriginal).toBe(3);
                expect(pick.status).toBe(1);
                expect(pick.currentTeam.toString()).toBe("61d24b1f925d775745e2f982");
                expect(pick.originalTeam.toString()).toBe("61d24b1f925d775745e2f97f");
                expect(pick.year.toString()).toBe("61d24dec70a75cbb7ff05337");
                expect(pick.round).toBe(1);
                expect(pick.overall).toBe(1);
                expect(pick.player.toString()).toBe("61a95c978be9093a2a514563");
                expect(pick.pickingTeamName).toBe("Test Team Name");
                expect(pick.pickingOwnerName).toBe("Test Name");
                expect(pick.contractYearsRemaining).toBe(2);
                expect(pick.timesExtended).toBe(0);
            }) 
    })

    test('Valid Request - Maximum Provided Data', async () => {
       return request.post('/jailors/api/picks')
            .set('Cookie', [`${PassportConstants.TokenCookie}=${token}`])
            .send({
                originalTeam: "61d24b1f925d775745e2f97f",
                year: "61d24dec70a75cbb7ff05337",
            })
            .then(async (res) => {
                expect(res.statusCode).toBe(StatusCodes.OK);
                expect(res.body.pick.year).toBe("61d24dec70a75cbb7ff05337");
                expect(res.body.pick.originalTeam).toBe("61d24b1f925d775745e2f97f");
                expect(res.body.pick.currentTeam).toBe("61d24b1f925d775745e2f97f");
                const pick = await DraftPicks.findById(res.body.pick._id);
                expect(pick.originalTeam.toString()).toBe("61d24b1f925d775745e2f97f");
                expect(pick.year.toString()).toBe("61d24dec70a75cbb7ff05337");
                expect(pick.currentTeam.toString()).toBe("61d24b1f925d775745e2f97f");
            }) 
    })


})