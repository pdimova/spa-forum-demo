'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/forum');

db.on('error', () => console.error('Db connection error'));
db.once('open', () => console.log('We are connected!')); //one time listener function for the event 

module.exports = mongoose;