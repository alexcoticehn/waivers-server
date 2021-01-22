require('dotenv').config();
require('../../models/PasswordResetLinks');
const mongoose = require('mongoose');
const crypto = require('crypto');
const PasswordResetService = require('../../services/auth/PasswordResetService');
const { ObjectId } = require('mongodb');
const PasswordResetLinks = mongoose.model("PasswordResetLinks");

beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST_DEV + 'waivers_password_reset_test', { useNewUrlParser: true, useUnifiedTopology: true });
})

afterAll(async () => {
    await mongoose.disconnect();
})

describe('Password Reset Link Generation Tests', () => {
    test('Password Reset Link - Create New', async () => {
        await PasswordResetLinks.deleteMany({});
        const resetLink = await PasswordResetService.createOrUpdatePasswordResetLink(new ObjectId(crypto.randomBytes(12).toString('hex')));
        const links = await PasswordResetLinks.find({});
        expect(links.length).toBe(1);
        expect(resetLink.token).toBe(links[0].token);
    })
})
