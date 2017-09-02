const configValues = require('./config');

module.exports = {
    getDbConnectionString: function () {
        return `mongodb://${configValues.username}:${configValues.password}@ds149743.mlab.com:49743/node_todo_app`;
    }
};

