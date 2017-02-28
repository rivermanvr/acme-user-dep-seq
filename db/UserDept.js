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
        getUserDeptSize: function() {

        }
    }
});

module.exports = UserDept;
