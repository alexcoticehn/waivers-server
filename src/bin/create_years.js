/**
 * To use this script, run "npm run create_years -- --db=<local_db_name>" from the root (server) directory
 */
require('dotenv').config();
require('../models/Years');
// const argv = require('minimist')(process.argv.slice(2));
const mongoose = require('mongoose');
const YearsModel = mongoose.model('Years');

async function connectDB() {
    await mongoose.connect(process.env.DB_CLOUD_CONNECTION_STRING_PROD, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
    await mongoose.disconnect();
}

async function createYears(years_to_create) {
    await YearsModel.insertMany(years_to_create);
}

async function runScript() {
    const year1 = {
        startDate: new Date('2011-10-06'),
        endDate: new Date('2012-04-07')
    };

    const year2 = {
        startDate: new Date('2013-01-19'),
        endDate: new Date('2013-04-28')
    };

    const year3 = {
        startDate: new Date('2013-10-01'),
        endDate: new Date('2014-04-13')
    }

    const year4 = {
        startDate: new Date('2014-10-08'),
        endDate: new Date('2015-04-11')
    }

    const year5 = {
        startDate: new Date('2015-10-07'),
        endDate: new Date('2016-04-10')
    }

    const year6 = {
        startDate: new Date('2016-10-12'),
        endDate: new Date('2017-04-09')
    }

    const year7 = {
        startDate: new Date('2017-10-04'),
        endDate: new Date('2018-04-08')
    }

    const year8 = {
        startDate: new Date('2018-10-03'),
        endDate: new Date('2019-04-06')
    }

    const year9 = {
        startDate: new Date('2019-10-02'),
        endDate: new Date('2020-03-11')
    }

    const year10 = {
        startDate: new Date('2021-01-13'),
        endDate: new Date('2021-05-19')
    }

    const years = [year1, year2, year3, year4, year5, year6, year7, year8, year9, year10];

    await connectDB();

    await createYears(years);

    await disconnectDB();

    process.exit();
}

runScript();