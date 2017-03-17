const mongoose = require('mongoose');
const bluebird = require('bluebird');


module.exports = server => {
    server.mongoose = mongoose.connect(server.settings.db.mongo.url);
    server.mongoose.Promise = bluebird;
    server.models = {
        User: require('./users')(server),
        Todo: require('./todos')(server),
        Token: require('./token')(server),
        Project: require('./project')(server),
        Role: require('./roles')(server),
        UserTeam: require('./userTeams'),
        Team: require('./teams')(server)

    }
};
