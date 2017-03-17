const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields('title'),
        server.actions.projects.create
    );

    router.get('/',
        server.actions.projects.list);

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.projects.show);

    router.put('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('projects.update'),
        server.middlewares.bodyParser.json(),
        server.actions.projects.update);

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('projects.remove'),
        server.actions.projects.remove);


    return router;
};
