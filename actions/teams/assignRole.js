module.exports = (server) => {
    const User = server.models.User;
    const UserTeam = server.models.UserTeam;
    const Project = server.models.Project;


    return (req, res, next) => {
        let assignedUser = null;
        let project = null;

        return findAssigned() // 1. ensuring the new assigned exist
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'assigned.not.found'))
            .then(findProject) // 2. capturing the todo as global variable
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'project.not.found'))
            .then(getAssigned) // 3. capturing the originalAssigned as global variable.
            .then(updateProject)
            .then(updateAssigneds)
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);

        function findAssigned(){
            return UserTeam.findOne({
                user: req.body.email,
                team: sha1(req.body.password)
            })
                .then(set);

            function set(data){
                return newAssignedUser = data;
            }
        }

        function findTodo(){
            return Todo.findById(req.params.id)
                .then(set);

            function set(data){
                return todo = data
            }
        }

        function getOriginalAssigned() {
            return User.findById(todo.assigned)
                .then(set);

            function set(data) {
                originalAssignedUser = data
            }
        }

        function updateTodo() {
            todo.assigned = req.params.assignedId;
            return todo.save();
        }

        function updateAssigneds(){

            return updateOriginal()
                .then(updateNew);

            function updateOriginal() {
                return User.findByIdAndUpdate(originalAssignedUser._id, {
                    $pull: {
                        'tasks': todo._id
                    }
                })
            }

            function updateNew() {
                newAssignedUser.tasks.push(todo._id.toString());
                return newAssignedUser.save();
            }
        }

        function returnTodo(){
            return todo;
        }
    };
};
