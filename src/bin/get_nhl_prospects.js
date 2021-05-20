/**
 * To use this script, run "npm run get_nhl_prospects -- --db=<local_db_name>" from the root (server) directory
 */
require('dotenv').config();
require('../models/Players');
const axios = require('axios');
// const argv = require('minimist')(process.argv.slice(2));
const mongoose = require('mongoose');
const PlayersModel = mongoose.model('Players');

async function connectDB() {
    await mongoose.connect(process.env.DB_CLOUD_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function createPlayers(players_to_create) {
    await PlayersModel.insertMany(players_to_create);
}

async function runScript() {
    await connectDB();

    let players_to_add = []

    // Currently have this set to only grab from 1 draft at a time
    for (let i = 2020; i < 2021; i++) {
        let draft_results = await axios.get('https://statsapi.web.nhl.com/api/v1/draft/' + i);
        for (let rounds of draft_results.data.drafts[0].rounds) {
            for (let pick of rounds.picks) {
                if (pick.prospect.id) {
                    let prospect_response = await axios.get('https://statsapi.web.nhl.com/api/v1/draft/prospects/' + pick.prospect.id);
                    let prospect_data = prospect_response.data.prospects[0];
                    if (prospect_data.nhlPlayerId) {
                        if (!(await PlayersModel.findOne({nhl_id: prospect_data.nhlPlayerId}))) {
                            console.log('Must add player ' + prospect_data.fullName + ' ' + prospect_data.nhlPlayerId);
                            players_to_add.push({
                                firstname: prospect_data.firstName,
                                lastname: prospect_data.lastName,
                                nhl_id: prospect_data.nhlPlayerId,
                                prospect_id: prospect_data.id
                            })
                        } else {
                            console.log('Already have player ' + prospect_data.fullName + ' ' + prospect_data.nhlPlayerId);
                        }
                    }
                }
            }
        }
    }

    await createPlayers(players_to_add);

    await disconnectDB();
}

runScript();