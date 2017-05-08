'use strict';

const mongoose = require('mongoose');

module.exports = (config) => {
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;

    mongoose.connect(config.database);

    db.on('error', () => console.error('Db connection error'));
    db.once('open', () => console.log('We are connected!')); //one time listener function for the event 

    return mongoose;
}
