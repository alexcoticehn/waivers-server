/* eslint-disable no-undef */
/*global require*/
require('../config/mongoose');
require('../models/Users');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const SaltRounds = require('../config/passport');
const UsersModel = mongoose.model('Users');

function clearUsers() {
    UsersModel.deleteMany()
    .catch((err) => {
        console.log(err);
        process.exit();
    })
    .then(() => {});
}

function createUsers(users_to_create) {
    UsersModel.insertMany(users_to_create)
    .then(() => {
        process.exit();
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    });
}

async function runScript() {
    
    clearUsers();

    const Dimitri = {
        username: "dfilipovic",
        firstname: "Dimitri",
        lastname: "Filipovic",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Harrison = {
        username: "hbrown",
        firstname: "Harrison",
        lastname: "Brown",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Alex = {
        username: "acoticehn",
        firstname: "Alex",
        lastname: "Cotic-Ehn",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Chris = {
        username: "clittomericzky",
        firstname: "Chris",
        lastname: "Littomericzky",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Eric = {
        username: "ewallin",
        firstname: "Eric",
        lastname: "Wallin",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Ian = {
        username: "icarter",
        firstname: "Ian",
        lastname: "Carter",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Stefan = {
        username: "skalaba",
        firstname: "Stefan",
        lastname: "Kalaba",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Jimmy = {
        username: "jghuman",
        firstname: "Jimmy",
        lastname: "Ghuman",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Nathan = {
        username: "nalvarez",
        firstname: "Nathan",
        lastname: "Alvarez",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Peter = {
        username: "pbohdal",
        firstname: "Peter",
        lastname: "Bohdal",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const users_to_create = [Dimitri, Harrison, Alex, Chris, Stefan, Eric, Ian, Peter, Jimmy, Nathan];

    createUsers(users_to_create);
}

runScript();