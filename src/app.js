/* eslint-disable no-undef */
/*global require*/
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const errorHandler = require('errorhandler');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
  app.use(errorHandler());
}

// configure mongoose
mongoose.connect('mongodb://localhost:27017/waivers_local', {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => {console.log("connection successful")},
    // eslint-disable-next-line no-unused-vars
    _err => {console.log("connection failed")}
);
mongoose.set('debug', true);

// Models & Routes
require('./models/Users');

// Passport Config (must be below models)
require('./config/passport');

// Controllers
app.use(require('./controllers'));

if (!isProduction) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use((err, req, res, next) => {
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