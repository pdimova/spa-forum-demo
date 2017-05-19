'use strict';

const routesModule = (controllerModule => {
    let root = null;
    let useHash = true; // Defaults to: false
    let hash = '#!'; // Defaults to: '#'
    const router = new Navigo(null, false);

    let redirectHomeHook = { after: () => router.navigate('/') };


    router
        .on('/', controllerModule.home)
        .on('/register', controllerModule.register)
        .on('/login', controllerModule.login)
        //.on(router.navigate('/'))
        .notFound(function () {
            // called when there is path specified but there is no route matching
            console.log('Not found here');
        })
        .resolve();
})(controllerModule);

