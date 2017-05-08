'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = (config) => {
    const app = express();

    app.use(morgan(config.loggerMode));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    return app;
}

