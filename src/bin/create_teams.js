/**
 * To use this script, run "npm run create_teams -- --db=<local_db_name>" from the root (server) directory
 */
require('dotenv').config();
require('../models/Users');
require('../models/Teams');
const argv = require('minimist')(process.argv.slice(2));
const mongoose = require('mongoose');
const TeamsModel = mongoose.model('Teams');
const UsersService = require('../services/users/UsersService');

async function connectDB() {
    await mongoose.connect(process.env.DB_HOST_DEV + argv.db, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function clearTeams() {
    await TeamsModel.deleteMany();
}

async function createTeams(teams_to_create) {
    await TeamsModel.insertMany(teams_to_create);
}

async function runScript() {
    await connectDB();
    await clearTeams();

    const DTMB = {
        name: "Don't Toews Me, Bro",
        owner_id: (await UsersService.findUserByUsername('acoticehn'))._id
    }

    const DBS = {
        name: "Don't Be Saad",
        owner_id: (await UsersService.findUserByUsername('dfilipovic'))._id
    }

    const HKH = {
        name: "Wheeler? I Hardly Knew Her!",
        owner_id: (await UsersService.findUserByUsername('hbrown'))._id
    }

    const DWM = {
        name: "Dude, Where's Makar?",
        owner_id: (await UsersService.findUserByUsername('clittomericzky'))._id
    }

    const DP = {
        name: "Double Pennertration",
        owner_id: (await UsersService.findUserByUsername('ewallin'))._id
    }

    const TGUD = {
        name: "Team TOO GOOD",
        owner_id: (await UsersService.findUserByUsername('nalvarez'))._id
    }

    const BIGM = {
        name: "Big Money $$$",
        owner_id: (await UsersService.findUserByUsername('pbohdal'))._id
    }

    const MCJ = {
        name: "McJesus!",
        owner_id: (await UsersService.findUserByUsername('jghuman'))._id
    }

    const BP = {
        name: "Bustin' Pumpkins",
        owner_id: (await UsersService.findUserByUsername('mwinter'))._id
    }

    const WDC = {
        name: "The Wet Dick Carters",
        owner_id: (await UsersService.findUserByUsername('icarter'))._id
    }

    const teams_to_create = [WDC, BP, MCJ, BIGM, TGUD, DP, DWM, HKH, DBS, DTMB];

    await createTeams(teams_to_create);
    await disconnectDB();
    process.exit();
}

runScript();