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
        cleanRec: function () {
            return this.findAll({
                where: {
                    $or: [
                        {
                            userId: null
                        },
                        {
                            departmentId: null
                        }
                    ]
                }
            })
            .then((result) => {
                result.forEach((record) => {
                    
                    return this.destroy({
                        where: {
                            id: record.id
                        }
                    })
                })
            })
        }
    }

});

module.exports = UserDept;
