const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('teams.create'),
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields('title'),
        server.actions.teams.create
    );

    router.get('/',
        server.actions.teams.list);

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.teams.show);

    router.put('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('teams.update'),
        server.middlewares.bodyParser.json(),
        server.actions.teams.update);

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('teams.remove'),
        server.actions.teams.remove);

    // router.put('/:id/assign/:assignedId',
    //     server.middlewares.ensureAuthenticated,
    //     server.middlewares.ensureRights('teams.assignRole'),
    //     server.actions.teams.assign);

    return router;
};
