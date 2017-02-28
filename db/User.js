const acmeDB = require( './db' );

const User = acmeDB.define('user', {
    name: acmeDB.Sequelize.STRING
}, {
    // instanceMethods: {
    //     hasMoreRowData: function () {

    //     }
    // },
    // getterMethods: {
    //     getSomeRowData: function() {

    //     }
    // },
    classMethods: {
        addUserName: function (name) {
            return this.create({name: name});
        },
        delUserID: function (userID) {
            return this.destroy({
                where: {
                    id: userID
                }
            })
            // .then(() => {
            //     return acmeDB.models.UserDept.cleanRec();
            // })
        }
    }
});

module.exports = User;