'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (config) => {
    const app = express();

    app.use(express.static(config.publicPath));
    app.use(cors());
    app.use(morgan(config.loggerMode));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    return app;
}