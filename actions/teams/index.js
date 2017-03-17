module.exports = (server) => {

  const Team = server.models.Team;
  const User = server.models.User;
  const Project = server.models.Project;

  return {
    create,
    list,
    show,
    update,
    remove
  }

  function create(req, res, next) {
    let team = new Team(req.body);
    let user = null;
    let project = null;
    let newProject = null;

    return User.findById(req.user.id)
      .then(server.utils.ensureOne)
      .catch(server.utils.reject(403, 'invalid.user'))
      .then(createTeam)
      .then(setAdmin)
      .then(updateProject)
      .then(persist)
      .then(res.commit)
      .catch(res.error);

    function createTeam(data) {
      user = data;
      return new Team(req.body);
    }

    function setAdmin(team){
      team.userOwner = req.user.id;
      return team;
    }

    function updateProject(team){

      Project.findByIdAndUpdate(team.project, team)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(404, 'project.not.found'))
          .then(server.utils.empty)
          .then(res.commit)
          .catch(res.error);

      return team;
    }

    function persist(team) {
      return team.save()
        .then(returnTeam);

        function returnTeam() {
          return team;
        }
    }

  }


  function list(req, res, next) {
      Team.find()
          .then(res.commit)
          .catch(res.error);
  }

  function show(req, res, next) {
      Team.findById(req.params.id)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(404, 'project.not.found'))
          .then(res.commit)
          .catch(res.error);
  }

  function update(req, res, next) {
      Team.findByIdAndUpdate(req.body.id, req.body)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(404, 'project.not.found'))
          .then(server.utils.empty)
          .then(res.commit)
          .catch(res.error);
  }

  function remove(req, res, next) {
      Team.findByIdAndRemove(req.params.id)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(404, 'project.not.found'))
          .then(server.utils.empty)
          .then(res.commit)
          .catch(res.error);
  }




};
