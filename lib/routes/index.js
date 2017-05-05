'use strict';

module.exports = (app) => {
    let userRouter = require('./users');

    app.use('/api/users', userRouter);
    //app.use('api/materials', materialsRouter);
    //app.use('api/user-materials', userMaterialsRouter);
    //app.use('api/profiles', profilesRouter);
};