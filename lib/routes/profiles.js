'use strict';

module.exports = (userData) => {
    const express = require('express');
    let router = express.Router();

    router.get('/:username', (req, res, next) => {
        let username = req.params.username;

        userData
            .getUserByUsername(username)
            .then(dbUser => {

                // TODO: Mapper
                let user = {
                    username: dbUser.username,
                    id: dbUser.id,
                    userMaterials: dbUser.userMaterials
                };

                res.status(200).json({ 'result': user });
            })
            .catch(error => {
                next(error);
            });
    });

    return router;
}