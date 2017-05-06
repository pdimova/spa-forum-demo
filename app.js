/* eslint-disable no-console */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./lib/config/config');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./lib/config/mongoose');

require('./lib/routes/index')(app);


app.use((req, res) => {
    res.status(404).send('Oppps');
});
app.use((err, req, res, next) => {
    console.error(err);
});

app.listen(config.port, () => console.log('Magic happens at http://localhost:' + config.port));