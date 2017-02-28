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
        delByDeptID: function (deptID) {
            return this.findAll(
                {
                    where: {departmentId: deptID}
                })
            }
    }

});

module.exports = UserDept;
