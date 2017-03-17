module.exports = (server) => {
    const Project = server.models.Project;
    const User = server.models.User;

    return {
        create,
        list,
        show,
        update,
        remove
    };

    function create(req, res, next) {
        let userCreator = null;

        return User.findById(req.user.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(403, 'invalid.user'))
            .then(createProject)
            .then(setCreator)
            .then(persist)
            .then(res.commit)
            .catch(res.error);

        function createProject(data) {
            userCreator = data;
            console.log("project: " + req.body.title);
            return new Project(req.body);
        }

        function setCreator(project) {
            project.userCreator = req.user.id;
            return project;
        }

        function persist(project) {
            return project.save()
                //.then(addToUser)
                .then(returnProject);

            /*function addToUser(project) {
                user.projects.push(project._id);
                user.save()
            }*/

            function returnProject() {
                return project;
            }
        }
    }

    function list(req, res, next) {
        Project.find()
            .then(res.commit)
            .catch(res.error);
    }

    function show(req, res, next) {
        Project.findById(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'project.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {
        Project.findByIdAndUpdate(req.body.id, req.body)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'project.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    function remove(req, res, next) {
        Project.findByIdAndRemove(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'project.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }
};
