const acmeDB = require( './db' );

const Department = acmeDB.define('department', {
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

module.exports = Department;
