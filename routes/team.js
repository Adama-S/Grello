const Router = require('express').Router;

module.exports = (server) => {
  let router = new Router();

  router.post('/',
    server.middlewares.bodyParser.json(),
    server.middlewares.ensureFields(['name', 'project']),
    server.actions.team.create
  );

  return router;

}
