'use strict';

const VALID_CATEGORIES = ['watched', 'want-to-watch', 'watching'];
const authenticator = require('../utils/authenticator');
const validator = require('../utils/validator');
const mapper = require('../utils/mapper');

module.exports = (userData, materialData) => {
    const express = require('express');
    let router = express.Router();

    router.get('/', authenticator.authenticationMiddleware, (req, res, next) => {
        let username = req.user.username;

        userData
            .getUserByUsername(username)
            .then(dbUser => {

                let materials = dbUser.userMaterials.map(m => materialData.getMaterialById(m.id));
                materials.unshift(Promise.resolve(dbUser.userMaterials));

                return Promise.all(materials);
            })
            .then(dbMaterials => {

                let userMaterials = dbMaterials.shift();

                let result = Array.from(dbMaterials, material => {
                    let materialWithCategory = mapper.toMaterialResponse(material);
                    delete materialWithCategory.comments;
                    materialWithCategory.category = userMaterials.find(um => um.id === material.id).category;
                    return materialWithCategory;

                });
                res.status(200).json({ result });

            })
            .catch(err => {
                next(err);
            });
    });

    router.get(/^\/(\w+\-*)+$/i, authenticator.authenticationMiddleware, (req, res, next) => {
        if (!VALID_CATEGORIES.includes(req.path.substr(1))) {
            next();
            return;
        }

        let category = req.path.substr(1);
        let user = {
            id: req.user.id,
            username: req.user.username
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

                let result = Array.from(dbMaterials, material => {
                    let materialWithCategory = mapper.toMaterialResponse(material);
                    delete materialWithCategory.comments;
                    materialWithCategory.category = category;
                    return materialWithCategory;
                });

                res.status(200).json({ result });
            })
    })

    router.post('/', authenticator.authenticationMiddleware, (req, res, next) => {
        let materialId = req.body.id;
        let category = req.body.category;
        let user = {
            id: req.user.id,
            username: req.user.username
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

    router.put('/', authenticator.authenticationMiddleware, (req, res, next) => {
        let userMaterial = {
            id: eq.body.id,
            category: req.body.category
        };
        let user = {
            id: req.user.id,
            username: req.user.username
        }

        userData.changeUserMaterial(user.id, userMaterial)
            .then(dbUser => {
                let userMaterial = dbUser.userMaterials.find(um => um.id === userMaterial.id);
                res.status(200).json({ result: userMaterial });
            })
            .catch(error => {
                next(error);
            });
    });

    return router;
}
