const express = require('express');
const server = express();
const Sequelize = require('sequelize');

const connectDB = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const acmeDB = new Sequelize(connectDB);

const Department = acmeDB.define('department', {
    name: acmeDB.Sequelize.STRING
}, {
    classMethods: {
        getDept: function (deptId) {
            return this.findAll({
                where: deptId
            })
        }
    }
});
const User = acmeDB.define('user', {
    name: acmeDB.Sequelize.STRING
});
const UserDept = acmeDB.define('user_dept', {});

User.hasMany(UserDept);
Department.hasMany(UserDept);

const sync = () => {
    return acmeDB.sync({ force: true });
};

const seed = () => {
    //doing this just to remember & use .spread
    let vin, gary, roy, karen, humanR, secur, iTech, prod;
    return sync()
        .then(() => {
            return Promise.all([
                User.create({name: 'Vince'}),
                User.create({name: 'Gary'}),
                User.create({name: 'Roy'}),
                User.create({name: 'Karen'}),
            ])
        })
        .spread(( _vin, _gary, _roy, _karen ) => {
            vin = _vin;
            gary = _gary;
            roy = _roy;
            karen = _karen;
            return Promise.all([
                Department.create({name: 'Human Resources'}),
                Department.create({name: 'Security'}),
                Department.create({name: 'Information Technology'}),
                Department.create({name: 'Production'})
            ])
        })
        .spread(( _humanR, _secur, _iTech, _prod ) => {
            humanR = _humanR;
            secur = _secur;
            iTech = _iTech;
            prod = _prod;
            return Promise.all([
                UserDept.create({userId: vin.id, departmentId: iTech.id}),
                UserDept.create({userId: vin.id, departmentId: prod.id}),
                UserDept.create({userId: gary.id, departmentId: prod.id}),
                UserDept.create({userId: roy.id, departmentId: secur.id}),
                UserDept.create({userId: karen.id, departmentId: humanR.id})
            ])
        //--------------------------------------------------------
        //making sure I understand the data and how to get at it.
        })
        .then( result => {
            return Department.findById(prod.id, {
                include: [UserDept]
            });
        })
        .then( department => {
            console.log('# of users in production are: ', department.user_depts.length)
        })
        //--------------------------------------------------------
};

seed()
    .then(() => console.log('your data is seeded'))
    .catch( err => console.log(err));

console.log('Models: ', acmeDB.models);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
