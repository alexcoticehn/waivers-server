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

    test('Password Reset Link - Create Additional', async () => {
        await PasswordResetLinks.deleteMany({});
        const user_id = new ObjectId(crypto.randomBytes(12).toString('hex'));
        const resetLink = await PasswordResetService.createOrUpdatePasswordResetLink(user_id);
        const secondLink = await PasswordResetService.createOrUpdatePasswordResetLink(user_id);
        expect(resetLink.token).toBe(secondLink.token);
    })
})

describe('Password Reset Link Validity Tests', () => {
    test('Password Reset Link Valid', () => {
        const resetLink = {
            pending: 1,
            tokenExpires: Date.now() + 3600000
        }
        expect(PasswordResetService.isPasswordResetLinkValid(resetLink)).toBe(1);
    })

    test('Password Reset Link Invalid - Not Pending', () => {
        const resetLink = {
            pending: 0,
            tokenExpires: Date.now() + 3600000
        }
        expect(PasswordResetService.isPasswordResetLinkValid(resetLink)).toBe(0);
    })

    test('Password Reset Link Invalid - Time Expired', () => {
        const resetLink = {
            pending: 1,
            tokenExpires: Date.now() - 3600000
        }
        expect(PasswordResetService.isPasswordResetLinkValid(resetLink)).toBe(false);
    })

    test('Password Reset Link Invalid - Time Expired and Not Pending', () => {
        const resetLink = {
            pending: 0,
            tokenExpires: Date.now() - 3600000
        }
        expect(PasswordResetService.isPasswordResetLinkValid(resetLink)).toBe(false);
    })

    test('Password Reset Link Invalid - Null Link', () => {
        const resetLink = null;
        expect(PasswordResetService.isPasswordResetLinkValid(resetLink)).toBe(false);
    })

    test('Password Reset Link Invalid - Undefined Link', () => {
        const resetLink = undefined;
        expect(PasswordResetService.isPasswordResetLinkValid(resetLink)).toBe(false);
    })
})