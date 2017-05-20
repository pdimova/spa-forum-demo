'use strict';

module.exports = (Model) => {

    return {
        getAllUsers() {
            return Model
                .find()
                .exec();
        },
        getUserByUsername(username) {
            return Model
                .findOne({ username })  //If no document satisfies the query, the method returns null
                .exec();
        },
        createUser(username, password) {
            let user = new Model({ username, password });
            return user.save();
        },
        addUserMaterial(id, userMaterial) {
            return Model
                .findById(id)
                .then(dbUser => {
                    if (!dbUser) {
                        return Promise.reject(new Error('No such user!'));
                    }

                    dbUser.userMaterials.push(userMaterial);

                    return dbUser.save();
                });
        },
        changeUserMaterial(id, userMaterial) {
            return Model
                .findById(id)
                .then(dbUser => {
                    if (!dbUser) {
                        return Promise.reject(new Error('No such user!'));
                    }

                    let material = dbUser.userMaterials.find(um => um.id === userMaterial.id);
                    if (!material) {
                        return Promise.reject(new Error('No such material!'));
                    }

                    material.category = userMaterial.category;

                    return dbUser.save();
                });
        }
    }
}