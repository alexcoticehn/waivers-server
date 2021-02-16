require('dotenv').config();
require('../models/Users');
const argv = require('minimist')(process.argv.slice(2));
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Passport = require('../constants/PassportConstants');
const UsersModel = mongoose.model('Users');

async function connectDB() {
    await mongoose.connect(process.env.DB_HOST_DEV + argv.db, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function clearUsers() {
    await UsersModel.deleteMany();
}

async function createUsers(users_to_create) {
    await UsersModel.insertMany(users_to_create);
}

async function runScript() {
    await connectDB();
    await clearUsers();

    const Dimitri = {
        username: "dfilipovic",
        firstname: "Dimitri",
        lastname: "Filipovic",
        email: "dimitri.filipovic@gmail.com",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Harrison = {
        username: "hbrown",
        firstname: "Harrison",
        lastname: "Brown",
        email: "c.harrison.brown@gmail.com",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Alex = {
        username: "acoticehn",
        firstname: "Alex",
        lastname: "Cotic-Ehn",
        email: "alcabc7@hotmail.com",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Chris = {
        username: "clittomericzky",
        firstname: "Chris",
        lastname: "Littomericzky",
        email: "chris_litto@hotmail.com",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Eric = {
        username: "ewallin",
        firstname: "Eric",
        lastname: "Wallin",
        email: "ericaxelwallin@gmail.com",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Ian = {
        username: "icarter",
        firstname: "Ian",
        lastname: "Carter",
        email: "ian.carter@live.ca",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Stefan = {
        username: "mwinter",
        firstname: "Michael",
        lastname: "Winter",
        email: "mikezima16@gmail.com",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Jimmy = {
        username: "jghuman",
        firstname: "Jimmy",
        lastname: "Ghuman",
        email: "jimmyghuman@hotmail.com",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Nathan = {
        username: "nalvarez",
        firstname: "Nathan",
        lastname: "Alvarez",
        email: "nla86@hotmail.ca",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const Peter = {
        username: "pbohdal",
        firstname: "Peter",
        lastname: "Bohdal",
        email: "peterbohdal@gmail.com",
        password: await bcrypt.hash("123456789", Passport.SaltRounds)
    };

    const users_to_create = [Dimitri, Harrison, Alex, Chris, Stefan, Eric, Ian, Peter, Jimmy, Nathan];

    await createUsers(users_to_create);
    await disconnectDB();
    process.exit();
}

runScript();