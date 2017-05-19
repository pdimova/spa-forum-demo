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
                        //console.log(localStorage);
                        return Promise.resolve(response);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }
        }
    }
})(requesterModule)