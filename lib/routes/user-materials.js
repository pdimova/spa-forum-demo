'use strict';

const authenticator = require('../utils/authenticator');
const PATHS = ['watched', 'watching', 'want-to-watch'];

module.exports = (userData, materialData) => {

    const express = require('express');
    let router = express.Router();

    router.get('/', authenticator.authenticationMiddleware, (req, res, next) => {
        let username = req.decoded.username;

        userData
            .getUserByUsername(username)
            .then(dbUser => {

                let materials = dbUser.userMaterials.map(m => materialData.getMaterialById(m.id));
                materials.unshift(Promise.resolve(dbUser.userMaterials));

                return Promise.all(materials);
            })
            .then(dbMaterials => {

                let userMaterials = dbMaterials.shift();

                // TODO: Mapper
                let materials = Array.from(dbMaterials, material => {

                    return {
                        id: material.id,
                        title: material.title,
                        description: material.description,
                        createdAt: material.createdAt,
                        img: material.img,
                        commentsCount: material.comments.length,
                        user: {
                            id: material.user.id,
                            username: material.user.username
                        },
                        category: userMaterials.find(um => um.id === material.id).category
                    }
                });

                res.status(200).json({ result: materials });

            })
            .catch(err => {
                next(err);
            });
    });

    router.get(/^\/(\w+\-*)+$/i, authenticator.authenticationMiddleware, (req, res, next) => {
        if (!PATHS.includes(req.path.substr(1))) {
            next();
            return;
        }

        let category = req.path.substr(1);
        let user = {
            id: req.decoded.id,
            username: req.decoded.username
        }

        userData
            .getUserByUsername(user.username)
            .then(dbUser => {
                let filteredMaterials = dbUser.userMaterials
                    .filter(um => um.category === category)
                    .map(m => materialData.getMaterialById(m.id));

                return Promise.all(filteredMaterials);
            })
            .then(dbMaterials => {

                // TODO: Mapper
                let materials = Array.from(dbMaterials, material => {

                    return {
                        id: material.id,
                        title: material.title,
                        description: material.description,
                        createdAt: material.createdAt,
                        img: material.img,
                        commentsCount: material.comments.length,
                        user: {
                            id: material.user.id,
                            username: material.user.username
                        },
                        category: category
                    }
                });

                res.status(200).json({ result: materials });
            })
    })

    router.post('/', authenticator.authenticationMiddleware, (req, res, next) => {
        let materialId = req.body.id;
        let category = req.body.category;
        let user = {
            id: req.decoded.id,
            username: req.decoded.username
        }

        materialData
            .getMaterialById(materialId)
            .then(dbMaterial => {

                let userMaterial = {
                    id: dbMaterial.id,
                    title: dbMaterial.title,
                    category: category
                };

                return userData.addUserMaterial(user.id, userMaterial);
            })
            .then(dbUser => {

                let userMaterial = dbUser.userMaterials.find(um => um.id === materialId);
                res.status(200).json({ result: userMaterial });

            })
            .catch(error => {
                next(error);
            });
    });

    return router;
}
