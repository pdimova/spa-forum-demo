'use strict';

const dataService = (requesterModule => {

    return {
        users: {
            register(user) {
                return requesterModule.postJSON(`/api/users`, user);
            },
            login(user) {
                return requesterModule.putJSON(`/api/users/auth`, user)
                    .then(response => {
                        localStorage.setItem("username", response.result.username);
                        localStorage.setItem("token", response.result.token);
                        return Promise.resolve(response);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            },
            getByUsername(username) {
                return requesterModule.getJSON(`/api/profiles/${username}`);
            },
        },
        materials: {
            get() {
                return requesterModule.getJSON(`/api/materials`);
            },
            getByID(id) {
                return requesterModule.getJSON(`/api/materials/${id}`);
            },
            add(material) {
                let options = {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                };

                return requesterModule.postJSON(`/api/materials`, material, options);
            },
            addComment(id, comment) {
                let options = {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                };

                return requesterModule.putJSON(`/api/materials/${id}/comments`, comment, options);
            }
        },
        userMaterials: {
            get() { },
            getByAction(action) {
                let options = {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                };

                return requesterModule.getJSON(`/api/user-materials/${action}`, options);
            },
            assignCategory(status) {
                let options = {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                };

                return requesterModule.postJSON(`/api/user-materials`, status, options);
            }
        }
    }
})(requesterModule)