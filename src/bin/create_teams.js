/**
 * To use this script, run "npm run create_teams -- --db=<local_db_name>" from the root (server) directory
 */
require('dotenv').config();
require('../models/Users');
require('../models/Teams');
// const argv = require('minimist')(process.argv.slice(2));
const mongoose = require('mongoose');
const TeamsModel = mongoose.model('Teams');
const UsersService = require('../services/users/UsersService');

async function connectDB() {
    await mongoose.connect(process.env.DB_CLOUD_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function clearTeams() {
    await TeamsModel.deleteMany();
}

async function createTeam(team_to_create) {
    return await TeamsModel.create(team_to_create);
}

async function runScript() {
    await connectDB();
    await clearTeams();

    const Alex = await UsersService.findUserByUsername('acoticehn');
    const Dim = await UsersService.findUserByUsername('dfilipovic');
    const Harry = await UsersService.findUserByUsername('hbrown');
    const Chris = await UsersService.findUserByUsername('clittomericzky');
    const Eric = await UsersService.findUserByUsername('ewallin');
    const Nathan = await UsersService.findUserByUsername('nalvarez');
    const Peter = await UsersService.findUserByUsername('pbohdal');
    const Jimmy = await UsersService.findUserByUsername('jghuman');
    const Mike = await UsersService.findUserByUsername('mwinter');
    const Ian = await UsersService.findUserByUsername('icarter');

    const users = [Ian, Mike, Jimmy, Peter, Nathan, Eric, Chris, Harry, Dim, Alex];

    const DTMB = {
        name: "Don't Toews Me, Bro",
        owner: Alex.id
    }

    const DBS = {
        name: "Don't Be Saad",
        owner: Dim.id
    }

    const HKH = {
        name: "Wheeler? I Hardly Knew Her!",
        owner: Harry.id
    }

    const DWM = {
        name: "Dude, Where's Makar?",
        owner: Chris.id
    }

    const DP = {
        name: "Double Pennertration",
        owner: Eric.id
    }

    const TGUD = {
        name: "Team TOO GOOD",
        owner: Nathan.id
    }

    const BIGM = {
        name: "Big Money $$$",
        owner: Peter.id
    }

    const MCJ = {
        name: "McJesus!",
        owner: Jimmy.id
    }

    const BP = {
        name: "Bustin' Pumpkins",
        owner: Mike.id
    }

    const WDC = {
        name: "The Carters",
        owner: Ian.id
    }

    const teams_to_create = [WDC, BP, MCJ, BIGM, TGUD, DP, DWM, HKH, DBS, DTMB];


    for (let i = 0; i < users.length; i++) {
        const teamDoc = await createTeam(teams_to_create[i]);
        await users[i].updateOne({ team: teamDoc.id });
    }

    await disconnectDB();
    process.exit();
}

runScript();