'use strict';

const controllerModule = (($, viewLoader, dataService, toastr) => {
    const viewNames = {
        register: 'register',
        login: 'login'
    }

    let collectFormData = form => {
        let serializedForm = form.serializeArray();

        return serializedForm.reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
    }

    return {
        register() {
            viewLoader.get(viewNames.register)
                .then(compiledTemplate => {
                    let context = { title: "My New Post", body: "This is my first post!" };
                    const html = compiledTemplate(context);
                    $('#wrapper').html(html);

                    // Collect user input on form submit
                    $('form').on("submit", function (event) {
                        event.preventDefault(); // do NOT send this form to nowhere

                        let user = collectFormData($(this));

                        dataService.users.register(user)
                            .then(response => {
                                toastr.success(`Bravo, user ${response.result.username} just registered!`);

                                return dataService.users.login(user);
                            })
                            .then(response => {
                                $('.logout-btn').removeClass('hide');
                                $('.login-btn').addClass('hide');
                                $('.register-btn').addClass('hide');

                                document.location = "#/";
                                //document.location.reload();
                            })
                            .catch(err => {
                                if (err.result) {
                                    toastr.error(err.result.err);
                                }
                            });
                    });
                });
        },
        login() {
            viewLoader.get(viewNames.login)
                .then(compiledTemplate => {
                    let context = { title: "My New Post", body: "This is my first post!" };
                    const html = compiledTemplate(context);
                    $('#wrapper').html(html);

                    $('form').on("submit", function (event) {
                        event.preventDefault(); // do NOT send this form to nowhere

                        let user = collectFormData($(this));

                        dataService.users.login(user)
                            .then(response => {
                                toastr.success(`Logging ${response.result.username} in!`);
                                $('.logout-btn').removeClass('hide');
                                $('.login-btn').addClass('hide');
                                $('.register-btn').addClass('hide');

                                document.location = "#/";
                                //document.location.reload();
                            })
                            .catch(err => {
                                if (err.result) {
                                    toastr.error(err.result.err);
                                }
                            });
                    });
                });
        },
        home() {
            $('#wrapper').html('<h1>Hiiiiiii</h1>');
        }
    }
})($, viewLoader, dataService, toastr);