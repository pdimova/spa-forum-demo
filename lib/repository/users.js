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
                .findOne({ username })
                .exec();
        },
        createUser(username, password) {
            let user = new Model({ username, password });
            return user.save();
        }
    }
}