const acmeDB = require( './db' );

const UserDept = acmeDB.define('user_dept', {}, {
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

module.exports = UserDept;
