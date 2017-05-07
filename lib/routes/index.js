'use strict';

module.exports = (app) => {
    const data = require('../repository/index');

    let userRouter = require('./users')(data.users);
    let profilesRouter = require('./profiles')(data.users);
    let materialsRouter = require('./materials');
    let userMaterialsRouter = require('./user-materials');

    app.use('/api/users', userRouter);
    app.use('/api/profiles', profilesRouter);
    app.use('/api/materials', materialsRouter);
    app.use('/api/user-materials', userMaterialsRouter);
    // NOTE: be careful with rout's begining /

};