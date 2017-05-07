'use strict';

module.exports = (app) => {
    let userRouter = require('./users');
    let profilesRouter = require('./profiles');
    let materialsRouter = require('./materials');
    let userMaterialsRouter = require('./user-materials');

    app.use('/api/users', userRouter);
    app.use('/api/profiles', profilesRouter);
    app.use('/api/materials', materialsRouter);
    app.use('/api/user-materials', userMaterialsRouter);
    // NOTE: be careful with rout's begining /

};