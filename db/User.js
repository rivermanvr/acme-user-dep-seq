const acmeDB = require( './db' );

const User = acmeDB.define('user', {
    name: acmeDB.Sequelize.STRING
});

module.exports = User;