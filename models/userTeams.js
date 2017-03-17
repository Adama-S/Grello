module.exports = (server) => {
  const Schema = server.mongoose.Schema;

  const UserTeam = new Schema ({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
  });

  return server.mongoose.model('UserTeam', UserTeam);

}
