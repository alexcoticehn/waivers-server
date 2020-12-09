/* eslint-disable no-undef */
/*global require*/
require('../config/mongoose');
const mongoose = require('mongoose');
require('../models/Users');
const UsersModel = mongoose.model('Users');

const Dimitri = {
    username: "dfilipovic",
    firstname: "Dimitri",
    lastname: "Filipovic",
    password: "123456789"
};

UsersModel.create(Dimitri, function (err, res) {
    if (err) console.log(err);
    else console.log("Created Dimitri: " + res);
});