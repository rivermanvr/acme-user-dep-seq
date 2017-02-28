const acmeDB = require( './db' );

const User = acmeDB.define('user', {
    name: acmeDB.Sequelize.STRING
}, {
    instanceMethods: {
        hasMoreRowData: function () {

        }
    },
    getterMethods: {
        getSomeRowData: function() {

        }
    },
    classMethods: {
        getRowsOfData: function() {

        }
    }
});

module.exports = User;