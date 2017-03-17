module.exports = (server) => {

  const Team = server.models.Team;

  return {
    create,
    list,
    show,
    update,
    remove
  }

  function create(req, res, next) {
    let team = new Team(req.body);

    return Team.findOne({
      name: req.body.name
    })
      .then(server.utils.EnsureEmpty)
      .catch(server.utils.reject(403, 'team.already.exists'))
      .then(createTeam)
      .then(res.commit)
      .catch(res.error);

    function createTeam() {
      return new Team(req.body);
    }

  }
};
