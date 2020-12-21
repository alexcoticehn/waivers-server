/*global require*/
/*global process*/
require('../config/mongoose/mongoose');
require('../models/Users');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const SaltRounds = require('../config/passport/passport');
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
        email: "dimitri.filipovic@gmail.com",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Harrison = {
        username: "hbrown",
        firstname: "Harrison",
        lastname: "Brown",
        email: "c.harrison.brown@gmail.com",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Alex = {
        username: "acoticehn",
        firstname: "Alex",
        lastname: "Cotic-Ehn",
        email: "alcabc7@hotmail.com",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Chris = {
        username: "clittomericzky",
        firstname: "Chris",
        lastname: "Littomericzky",
        email: "chris_litto@hotmail.com",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Eric = {
        username: "ewallin",
        firstname: "Eric",
        lastname: "Wallin",
        email: "ericaxelwallin@gmail.com",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Ian = {
        username: "icarter",
        firstname: "Ian",
        lastname: "Carter",
        email: "ian.carter@live.ca",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Stefan = {
        username: "skalaba",
        firstname: "Stefan",
        lastname: "Kalaba",
        email: "stefan.kalaba@hotmail.com",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Jimmy = {
        username: "jghuman",
        firstname: "Jimmy",
        lastname: "Ghuman",
        email: "jimmyghuman@hotmail.com",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Nathan = {
        username: "nalvarez",
        firstname: "Nathan",
        lastname: "Alvarez",
        email: "nla86@hotmail.ca",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const Peter = {
        username: "pbohdal",
        firstname: "Peter",
        lastname: "Bohdal",
        email: "peterbohdal@gmail.com",
        password: await bcrypt.hash("123456789", SaltRounds)
    };

    const users_to_create = [Dimitri, Harrison, Alex, Chris, Stefan, Eric, Ian, Peter, Jimmy, Nathan];

    createUsers(users_to_create);
}

runScript();