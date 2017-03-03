//Will come back to this project shortly....

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
        // findLink: function (user_id, dept_id) {
        //     return this.findAll(
        //         where: { userId: user_id, departmentId: dept_id }
        //         );
        // },
        // cleanRec: function () {
        //     return this.findAll({
        //         where: {
        //             $or: [
        //                 {
        //                     userId: null
        //                 },
        //                 {
        //                     departmentId: null
        //                 }
        //             ]
        //         }
        //     })
        //     .then((result) => {
        //         result.forEach((record) => {
                    
        //             return this.destroy({
        //                 where: {
        //                     id: record.id
        //                 }
        //             })
        //         })
        //     })
        // }
    }

});

module.exports = UserDept;
