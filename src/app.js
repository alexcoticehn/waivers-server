require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

const corsConfig = {
    origin: 'http://192.168.1.66:8080/'
}

app.use(cors(corsConfig));
app.use(require('morgan')('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());

const isProduction = process.env.NODE_ENV === 'production';
// const isTest = process.env.NODE_ENV === 'test';
const isDev = app.get('env') === 'development';

// configure mongoose
if (isDev) {
    // For dev environment
    mongoose.connect(process.env.DB_HOST_DEV + process.env.DB_NAME_DEV, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('debug', true);
} else if (isProduction) {
    mongoose.connect(process.env.DB_CLOUD_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Models
require('./models/Users');
require('./models/PasswordResetLinks');

// Routes
const routes = require('./routes')
app.use('/api', routes);

app.all('/api/*', (req, res, next) => {
    const error = new Error('This URL does not exist on the server');
    error.status = 404;

    next(error);
})

if (!isProduction) {
    app.use((err, req, res, _next) => {
        res.status(err.status || 500).json({
            errors: {
                message: err.message,
                stack_trace: err.stack,
            },
        });
    });
} else {
    app.use((err, req, res, _next) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message
            },
        });
    });
}

module.exports = app;
