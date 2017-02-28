const acmeDB = require( './db' );

const Department = acmeDB.define('department', {
    name: acmeDB.Sequelize.STRING
}, {
    instanceMethods: {
        xxx: function (name) {
        }
    },
    getterMethods: {
        yyy: function() {
        }
    },
    classMethods: {
        addDeptName: function (name) {
            return this.create({name: name});
        },
        delDeptID: function (deptID) {
            return this.destroy({
                where: {
                    id: deptID
                }
            })
        }
    }
});

module.exports = Department;
