require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
// const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';
const isStaging = process.env.NODE_ENV === 'staging';

const corsWhitelist = ['http://localhost:8080', 'https://www.jailors.xyz', 'https://jailors.xyz',
    'https://production-branch.d2np6ogyacfunk.amplifyapp.com']

const corsConfig = {
    origin: function(origin, callback) {
        if (corsWhitelist.indexOf(origin) !== -1 || !isProduction) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}

app.use(cors(corsConfig));
app.use(require('morgan')('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// configure mongoose
if (isDev) {
    // For dev environment
    mongoose.connect(process.env.DB_CLOUD_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('debug', true);
} else if (isProduction) {
    const password = encodeURIComponent(process.env.DB_PASSWORD_PROD);
    const username = process.env.DB_USERNAME_PROD;
    const name = process.env.DB_NAME_PROD;
    mongoose.connect(`mongodb+srv://${username}:${password}@${name}.hykw9.mongodb.net/${name}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
} else if (isStaging) {
    mongoose.connect(process.env.DB_CLOUD_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Models
require('./models/Users');
require('./models/PasswordResetLinks');
require('./models/Teams');
require('./models/Players');
require('./models/Years');
require('./models/Standings');
require('./models/DraftPicks');

// Routes
const routes = require('./routes');
app.use('/jailors/api', routes);

app.all('/jailors/api/*', (req, res, next) => {
    const error = new Error('This URL does not exist on the server');
    error.status = 404;

    next(error);
})

if (!isProduction) {
    app.use((err, req, res, _next) => {
        res.status(err.status || 500).json({
            errors: err.errors,
            message: err.message,
            stack_trace: err.stack
        });
    });
} else {
    app.use((err, req, res, _next) => {
        res.status(err.status || 500);

        res.json({
            errors: err.errors,
            message: err.message
        });
    });
}

module.exports = app;
