'use strict';

module.exports = (app) => {
    let userRouter = require('./users');
    let profilesRouter = require('./profiles');

    app.use('/api/users', userRouter);
    app.use('/api/profiles', profilesRouter);
    //app.use('/api/materials', materialsRouter);
    //app.use('/api/user-materials', userMaterialsRouter);

};