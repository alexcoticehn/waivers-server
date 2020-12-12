/* eslint-disable no-undef */
/*global require*/
require('../config/mongoose');
require('../models/Users');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const SaltRounds = require('../config/passport');
const UsersModel = mongoose.model('Users');

UsersModel.deleteMany()
    .catch((err) => {
        console.log(err);
        process.exit();
    })
    .then(() => {});

const Dimitri = {
    username: "dfilipovic",
    firstname: "Dimitri",
    lastname: "Filipovic",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Harrison = {
    username: "hbrown",
    firstname: "Harrison",
    lastname: "Brown",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Alex = {
    username: "acoticehn",
    firstname: "Alex",
    lastname: "Cotic-Ehn",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Chris = {
    username: "clittomericzky",
    firstname: "Chris",
    lastname: "Littomericzky",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Eric = {
    username: "ewallin",
    firstname: "Eric",
    lastname: "Wallin",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Ian = {
    username: "icarter",
    firstname: "Ian",
    lastname: "Carter",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Stefan = {
    username: "skalaba",
    firstname: "Stefan",
    lastname: "Kalaba",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Jimmy = {
    username: "jghuman",
    firstname: "Jimmy",
    lastname: "Ghuman",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Nathan = {
    username: "nalvarez",
    firstname: "Nathan",
    lastname: "Alvarez",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

const Peter = {
    username: "pbohdal",
    firstname: "Peter",
    lastname: "Bohdal",
    password: bcrypt.hashSync("123456789", SaltRounds)
};

UsersModel.insertMany([Dimitri, Alex, Harrison, Chris, Eric, Ian, Stefan, Jimmy, Nathan, Peter])
    .then(() => {
        process.exit();
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    });