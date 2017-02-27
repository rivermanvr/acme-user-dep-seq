const acmeDB = require( './db' );

const Department = acmeDB.define('department', {
    name: acmeDB.Sequelize.STRING
}, {
    instanceMethods: {
        hasMultipleUsers: function () {
            return this.user_depts.length > 1;
        }
    }
});

module.exports = Department;
