/**
 * To use this script, run "npm run update_prospect_team_names -- --db=<local_db_name>" from the root (server) directory
 */
require('dotenv').config();
require('../models/Users');
require('../models/Teams');
// const argv = require('minimist')(process.argv.slice(2));
const mongoose = require('mongoose');
const UsersModel = mongoose.model('Users');
const TeamsModel = mongoose.model('Teams');

async function connectDB() {
    await mongoose.connect(process.env.DB_CLOUD_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function runScript() {
    const Dim = {
        username: 'dfilipovic',
        prospect_name: 'Girls Just Wanna Have Dunn'
    };

    const Alex = {
        username: 'acoticehn',
        prospect_name: 'Sex God Pod'
    };

    const Chris = {
        username: 'clittomericzky',
        prospect_name: 'Kazakh Politics'
    };

    const Nathan = {
        username: 'nalvarez',
        prospect_name: 'Flick That Bean'
    };

    const Harrison = {
        username: 'hbrown',
        prospect_name: 'Broken LaFrenulum Productions'
    };

    const Peter = {
        username: 'pbohdal',
        prospect_name: 'Big Money'
    };

    const Eric = {
        username: 'ewallin',
        prospect_name: 'Jost The Tip'
    };

    const Jimmy = {
        username: 'jghuman',
        prospect_name: 'Sour Kaut'
    };

    const Ian = {
        username: 'icarter',
        prospect_name: 'The Dry Dick Carters'
    };

    const Mike = {
        username: 'mwinter',
        prospect_name: 'Did I Stutzle?'
    };

    const teams = [Dim, Alex, Harrison, Chris, Nathan, Mike, Jimmy, Eric, Ian, Peter];

    await connectDB();

    for (let i = 0; i < teams.length; i++) {
        const user = await UsersModel.findOne({ username: teams[i].username });
        await TeamsModel.findOneAndUpdate({ owner: user.id }, { name_prospect: teams[i].prospect_name });
    }
    await disconnectDB();
}

runScript();
