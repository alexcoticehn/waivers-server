require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const mongoose = require('./config/mongoose/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorHandler());
}

// Models
require('./models/Users');
require('./models/PasswordResetLinks');

// Passport Config (must be below models)
require('./config/passport/passport');

// Routes
app.use(require('./routes'));

if (!isProduction) {
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, _next) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

const port = 3000;
app.listen(port, () => console.log("App listening on port " + port));