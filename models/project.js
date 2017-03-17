const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;

    const ProjectSchema = new Schema({
        title: String,

        /*team: {
            type: Schema.Types.ObjectId,
            ref: 'Team'
        },*/

        userCreator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    ProjectSchema.plugin(timestamps);

    return server.mongoose.model('Project', ProjectSchema);
};
