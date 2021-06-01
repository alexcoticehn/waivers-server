/**
 * To use this script, run "npm run create_standings -- --db=<local_db_name>" from the root (server) directory
 */
require('dotenv').config();
require('../models/Years');
require('../models/Teams');
require('../models/Standings');
require('../models/Users');
// const argv = require('minimist')(process.argv.slice(2));
const mongoose = require('mongoose');
const StandingsModel = mongoose.model('Standings');
const UsersService = require('../services/users/UsersService');
const { ObjectId } = require('mongodb');

async function connectDB() {
    await mongoose.connect(process.env.DB_CLOUD_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function enterStandings(standings) {
    await StandingsModel.insertMany(standings);
}

async function runScript() {
    await connectDB();
    // Find the year_id of the year you're adding standings for and enter it here
    const year_id = new ObjectId("60ac32a2d271531998e280d4");

    const Alex = await UsersService.findUserAndTeamByUsername('acoticehn');
    const Dim = await UsersService.findUserAndTeamByUsername('dfilipovic');
    const Harry = await UsersService.findUserAndTeamByUsername('hbrown');
    const Chris = await UsersService.findUserAndTeamByUsername('clittomericzky');
    const Eric = await UsersService.findUserAndTeamByUsername('ewallin');
    const Nathan = await UsersService.findUserAndTeamByUsername('nalvarez');
    const Peter = await UsersService.findUserAndTeamByUsername('pbohdal');
    const Jimmy = await UsersService.findUserAndTeamByUsername('jghuman');
    const Mike = await UsersService.findUserAndTeamByUsername('mwinter');
    const Ian = await UsersService.findUserAndTeamByUsername('icarter');

    const standings = [
        {
            year: year_id,
            team: Alex.team.id,
            position: 1,
            points: 81
        },
        {
            year: year_id,
            team: Chris.team.id,
            position: 2,
            points: 76
        },
        {
            year: year_id,
            team: Dim.team.id,
            position: 3,
            points: 72.5
        },
        {
            year: year_id,
            team: Nathan.team.id,
            position: 4,
            points: 67
        },
        {
            year: year_id,
            team: Harry.team.id,
            position: 5,
            points: 66.5
        },
        {
            year: year_id,
            team: Mike.team.id,
            position: 6,
            points: 48
        },
        {
            year: year_id,
            team: Ian.team.id,
            position: 7,
            points: 44
        },
        {
            year: year_id,
            team: Jimmy.team.id,
            position: 8,
            points: 36
        },
        {
            year: year_id,
            team: Eric.team.id,
            position: 9,
            points: 32
        },
        {
            year: year_id,
            team: Peter.team.id,
            position: 10,
            points: 27
        }
    ];

    await enterStandings(standings);

    await disconnectDB();

    process.exit();
}

runScript();