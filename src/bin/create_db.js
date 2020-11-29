/* eslint-disable no-undef */
/*global require*/
const mongoose = require('mongoose');
require('../models/Users');
const UsersModel = mongoose.model('Users');


const Dimitri = {
    username: "dfilipovic",
    firstname: "Dimitri",
    lastname: "Filipovic",
    password: "123456789"
};
UsersModel.create(Dimitri)
    .then(doc => { console.log("New person added: " + doc)})
    .catch(err => { console.log(err)});