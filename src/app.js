require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

if (!isProduction) {
  app.use(errorHandler());
}

// configure mongoose
mongoose.connect(process.env.DB_HOST_DEV + process.env.DB_NAME_DEV, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

// Models
require('./models/Users');
require('./models/PasswordResetLinks');

// Routes
app.use(require('./routes'));

if (!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

module.exports = app;
