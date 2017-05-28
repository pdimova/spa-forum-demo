'use strict';

const controllerModule = (($, viewLoader, dataService, toastr) => {
    const viewNames = {
        register: 'register',
        login: 'login',
        materials: 'materials',
        material: 'material',
        addForm: 'material-add',
        profile: 'profile',
        actionList: 'action-list'
    }

    let collectFormData = form => {
        let serializedForm = form.serializeArray();

        return serializedForm.reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
    }

    return {
        users: {
            register() {
                viewLoader.get('users', viewNames.register)
                    .then(compiledTemplate => {
                        $('#wrapper').html(compiledTemplate());

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
                viewLoader.get('users', viewNames.login)
                    .then(compiledTemplate => {
                        let context = {};
                        const html = compiledTemplate(context);
                        $('#wrapper').html(html);

                        $('form').on("submit", function (event) {
                            event.preventDefault(); // do NOT send this form to nowhere
                            let user = collectFormData($(this));

                            dataService.users.login(user)
                                .then(response => {
                                    toastr.success(`Logging ${response.result.username} in!`);
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
            profile(username) {
                let context;
                dataService.users.getByUsername(username)
                    .then(response => {
                        context = response;

                        return viewLoader.get('users', viewNames.profile)
                    })
                    .then(compiledTemplate => {
                        const html = compiledTemplate(context);
                        $('#wrapper').html(html);

                        $('.btn-watching').on("click", function (event) {
                            let action = $(this).data('actionType');
                            console.log(action);

                            let context;
                            dataService.userMaterials.getByAction(action)
                                .then(response => {
                                    context = response;

                                    return viewLoader.get(viewNames.actionList)
                                })
                                .then(compiledTemplate => {
                                    const html = compiledTemplate(context);
                                    $('#action-list').html(html);
                                })
                                .catch(err => {
                                    if (err.result) {
                                        toastr.error(err.result.err);
                                    }
                                });
                        });
                    })
                    .catch(err => { });
            }
        },
        materials: {
            getAll() {
                let context;
                dataService.materials.get()
                    .then(response => {
                        let currentUser = localStorage.getItem('username');
                        context = { result: response.result, currentUser };

                        return viewLoader.get('materials', viewNames.materials)
                    })
                    .then(compiledTemplate => {
                        const html = compiledTemplate(context);

                        $('#wrapper').html(html);
                    })
                    .catch(err => { });
            },
            getOne(id) {
                let context;
                dataService.materials.getByID(id)
                    .then(response => {
                        let currentUser = localStorage.getItem('username');
                        context = { result: response.result, currentUser };

                        return viewLoader.get('materials', viewNames.material)
                    })
                    .then(compiledTemplate => {
                        const html = compiledTemplate(context);
                        $('#wrapper').html(html);

                        $('.comments-list__reply-btn').on("click", function (event) {
                            let $this = $(this);
                            $this.addClass('hidden');

                            $('.respond__close-btn').removeClass('hidden');
                            let respondDiv = $('.respond');
                            respondDiv.removeClass('hidden');
                        });

                        $('.respond__close-btn').on("click", function (event) {
                            let $this = $(this);
                            $this.addClass('hidden');

                            $('.comments-list__reply-btn').removeClass('hidden');
                            let respondDiv = $('.respond');
                            respondDiv.addClass('hidden');
                        });

                        $('form').on("submit", function (event) {
                            event.preventDefault(); // do NOT send this form to nowhere

                            let comment = collectFormData($(this));

                            dataService.materials.addComment(id, comment)
                                .then(response => {
                                    toastr.success(`Bravo, ${response.user.username} , your comment was added!`);

                                    //document.location.reload();
                                    document.location = "#/materials/" + id;
                                })
                                .catch(err => {
                                    if (err.result) {
                                        toastr.error(err.result.err);
                                    }
                                });
                        });

                        $('.btn-watching').on("click", function (event) {
                            let action = $(this).data('actionType');
                            let status = {
                                id: id,
                                category: action
                            };

                            dataService.userMaterials.assignCategory(status)
                                .then(response => {
                                    toastr.success(`Bravo, ${response.result.title} , was saved to your '${response.result.category}' category!`);
                                })
                                .catch(err => {
                                    if (err.result) {
                                        toastr.error(err.result.err);
                                    }
                                });
                        });

                    })
                    .catch(err => { });
            },
            showAddForm() {
                viewLoader.get('materials', viewNames.addForm)
                    .then(compiledTemplate => {
                        let currentUser = localStorage.getItem('username');
                        let context = { currentUser };
                        const html = compiledTemplate(context);
                        $('#wrapper').html(html);

                        $('form').on("submit", function (event) {
                            event.preventDefault(); // do NOT send this form to nowhere

                            let material = collectFormData($(this));


                            dataService.materials.add(material)
                                .then(response => {
                                    toastr.success(`Post "${response.result.title}" just created!`);
                                    document.location = "#/";
                                })
                                .catch(err => {
                                    if (err.result) {
                                        toastr.error(err.result.err);
                                    }
                                });
                        });
                    })
            }
        }
    }
})($, viewLoader, dataService, toastr, componentHandler);