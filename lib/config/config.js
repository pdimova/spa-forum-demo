'use strict';


module.exports = {

    'port': process.env.PORT || 3000,
    'secret': 'patatopdeveloper',
    'expirationTime': '24h',
    'database': 'mongodb://localhost:27017/forum',
    'loggerMode': 'dev'
};