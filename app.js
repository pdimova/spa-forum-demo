/* eslint-disable no-console */
'use strict';

const config = require('./lib/config/config');
const app = require('./lib/config/express')(config);

require('./lib/config/mongoose')(config);
require('./lib/routes/index')(app);

app.use((req, res) => {
    res.status(404).send('Oppps');
});

app.use((err, req, res, next) => {
    console.error('Error handler middelware ' + err);
    
    if (!res.headersSent) {
        res.status(500).send('Internal error');
    }

});

app.listen(config.port, () => console.log('Magic happens at http://localhost:' + config.port));