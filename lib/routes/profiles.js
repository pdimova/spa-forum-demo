'use strict';

const mapper = require('../utils/mapper');

module.exports = (userData) => {
    const express = require('express');
    let router = express.Router();

    router.get('/:username', (req, res, next) => {
        let username = req.params.username;

        userData
            .getUserByUsername(username)
            .then(dbUser => {

                let result = mapper.toUserWithMaterials(dbUser);
                res.status(200).json({ result });
            })
            .catch(error => {
                next(error);
            });
    });

    return router;
}