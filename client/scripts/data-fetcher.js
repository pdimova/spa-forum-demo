'use strict';

const dataService = (requesterModule => {
    const domain = 'http://localhost:3000';

    return {
        users: {
            register(user) {
                return requesterModule.postJSON(`${domain}/api/users`, user);
            },
            login(user) {
                return requesterModule.putJSON(`${domain}/api/users/auth`, user)
                    .then(response => {
                        localStorage.setItem("username", response.result.username);
                        localStorage.setItem("token", response.result.token);
                        console.log(localStorage);
                        return Promise.resolve(response);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            },
            getByUsername(username) {
                return requesterModule.getJSON(`${domain}/api/profiles/${username}`);
            },
        },
        materials: {
            get() {
                return requesterModule.getJSON(`${domain}/api/materials`);
            },
            getByID(id) {
                return requesterModule.getJSON(`${domain}/api/materials/${id}`);
            },
            add(material) {
                let options = {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                };

                return requesterModule.postJSON(`${domain}/api/materials`, material, options);
            },
            addComment(id, comment) {
                let options = {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                };

                return requesterModule.putJSON(`${domain}/api/materials/${id}/comments`, comment, options);
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

                return requesterModule.getJSON(`${domain}/api/user-materials/${action}`, options);
            },
            assignCategory(status) {
                let options = {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                };

                return requesterModule.postJSON(`${domain}/api/user-materials`, status, options);
            }
        }
    }
})(requesterModule)