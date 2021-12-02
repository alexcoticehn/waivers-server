/**
 * To use this script, run "npm run get_nhl_players -- --db=<local_db_name>" from the root (server) directory
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
    const teams_with_rosters = await axios.get('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster');
    await connectDB();

    let players_to_add = []

    for (let team of teams_with_rosters.data.teams) {
        if (team.roster) {
            for (let player of team.roster.roster) {
                if (!(await PlayersModel.findOne({nhl_id: player.person.id}))) {
                    let player_info = await axios.get('https://statsapi.web.nhl.com/api/v1/people/' + player.person.id);
                    let firstName = player_info.data.people[0].firstName;
                    let lastName = player_info.data.people[0].lastName;
                    console.log('Must add player ' + firstName + ' ' + lastName + ' ' + player.person.id);
                    players_to_add.push({
                        firstname: firstName,
                        lastname: lastName,
                        nhl_id: player.person.id
                    })
                } else {
                    let player_info = await axios.get('https://statsapi.web.nhl.com/api/v1/people/' + player.person.id);
                    console.log('Already have player ' + player_info.data.people[0].firstName + ' ' + player_info.data.people[0].lastName + ' ' + player.person.id);
                }
            }
        }
    }

    await createPlayers(players_to_add);

    await disconnectDB();
}

runScript();