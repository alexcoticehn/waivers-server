/* eslint-disable no-undef */
/*global require*/
require('../config/mongoose');
const mongoose = require('mongoose');
require('../models/Users');
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
    password: "123456789"
};

const Harrison = {
    username: "hbrown",
    firstname: "Harrison",
    lastname: "Brown",
    password: "123456789"
};

const Alex = {
    username: "acoticehn",
    firstname: "Alex",
    lastname: "Cotic-Ehn",
    password: "123456789"
};

const Chris = {
    username: "clittomericzky",
    firstname: "Chris",
    lastname: "Littomericzky",
    password: "123456789"
};

const Eric = {
    username: "ewallin",
    firstname: "Eric",
    lastname: "Wallin",
    password: "123456789"
};

const Ian = {
    username: "icarter",
    firstname: "Ian",
    lastname: "Carter",
    password: "123456789"
};

const Stefan = {
    username: "skalaba",
    firstname: "Stefan",
    lastname: "Kalaba",
    password: "123456789"
};

const Jimmy = {
    username: "jghuman",
    firstname: "Jimmy",
    lastname: "Ghuman",
    password: "123456789"
};

const Nathan = {
    username: "nalvarez",
    firstname: "Nathan",
    lastname: "Alvarez",
    password: "123456789"
};

const Peter = {
    username: "pbohdal",
    firstname: "Peter",
    lastname: "Bohdal",
    password: "123456789"
};

UsersModel.insertMany([Dimitri, Alex, Harrison, Chris, Eric, Ian, Stefan, Jimmy, Nathan, Peter])
    .then(() => {
        console.log("Users added successfully");
        process.exit();
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    });