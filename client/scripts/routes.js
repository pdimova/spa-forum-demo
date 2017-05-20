'use strict';

const routesModule = (controllerModule => {
    let root = null;
    let useHash = true; // Defaults to: false
    let hash = '#!'; // Defaults to: '#'
    const router = new Navigo(null, false);

    let redirectHomeHook = { after: () => router.navigate('/') };

    router
        .on('/', controllerModule.materials.getAll)
        .on('/register', controllerModule.users.register)
        .on('/login', controllerModule.users.login)
        .on('/profiles/:username', params => controllerModule.users.profile(params.username))
        .on('/material/add', controllerModule.materials.showAddForm)
        .on('/materials/:id', params => controllerModule.materials.getOne(params.id)) //{}
        //.on(router.navigate('/'))
        .notFound(function () {
            // called when there is path specified but there is no route matching
            console.log('Not found here');
        })
        .resolve();
})(controllerModule);