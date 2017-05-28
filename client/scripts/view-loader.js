'use strict';

const viewLoader = (requesterModule => {
    const cashe = new Map();

    return {
        get(viewFolder, viewName) {
            if (cashe.has(viewName)) {
                return Promise.resolve(cashe.get(viewName));
            }

            let url = `../views/${viewFolder}/${viewName}.handlebars`;
            return requesterModule
                .get(url)
                .then(sourceTemplate => {
                    const compiledTemplate = Handlebars.compile(sourceTemplate);
                    cashe.set(viewName, compiledTemplate);

                    return Promise.resolve(compiledTemplate);
                });
        }
    }
})(requesterModule);