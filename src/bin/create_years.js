/**
 * To use this script, run "npm run create_years -- --db=<local_db_name>" from the root (server) directory
 */
require('dotenv').config();
require('../models/Years');
const argv = require('minimist')(process.argv.slice(2));
const mongoose = require('mongoose');
const YearsModel = mongoose.model('Years');

async function connectDB() {
    await mongoose.connect(process.env.DB_HOST_DEV + argv.db, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function createYears(years_to_create) {
    await YearsModel.insertMany(years_to_create);
}

async function runScript() {
    const year11 = {
        startDate: new Date('2021-10-12'),
        endDate: new Date('2022-05-01')
    }

    const years = [year11];

    await connectDB();

    await createYears(years);

    await disconnectDB();

    process.exit();
}

runScript();