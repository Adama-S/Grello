module.exports = (server) => {
  const Schema = server.mongoose.Schema;

  const TeamSchema = new Schema ({
    name: {
      type: String,
      required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    userOwner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  });

  return server.mongoose.model('Team', TeamSchema);
};
