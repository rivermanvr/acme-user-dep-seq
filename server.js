const express = require('express');
const server = express();
const Sequelize = require('sequelize');

const connectDB = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const acmeDB = new Sequelize(connectDB);

const Department = acmeDB.define('department', {
    name: acmeDB.Sequelize.STRING
});
const User = acmeDB.define('user', {
    name: acmeDB.Sequelize.STRING
});
const User_Dept = acmeDB.define('user_dept', {});

User.hasMany(User_Dept);
Department.hasMany(User_Dept);

const sync = () => {
    return acmeDB.sync({ force: true });
};

const seed = () => {
    return sync()
        .then(() => {
            return Promise.all([
                User.create({name: 'Vince'}),
                User.create({name: 'Gary'}),
                User.create({name: 'Roy'}),
                User.create({name: 'Karen'})
            ])
        })
        .then(() => {
            return Promise.all([
                Department.create({name: 'Human Resources'}),
                Department.create({name: 'Security'}),
                Department.create({name: 'Information Technology'}),
                Department.create({name: 'Production'})
            ])
        })
        .then(() => {
            return Promise.all([
                User_Dept.create({userId: 1, departmentId: 3}),
                User_Dept.create({userId: 1, departmentId: 4}),
                User_Dept.create({userId: 2, departmentId: 4}),
                User_Dept.create({userId: 3, departmentId: 2}),
                User_Dept.create({userId: 4, departmentId: 1})
            ])
        })
};

seed()
    .then(() => console.log('your data is seeded'))
    .catch( err => console.log(err));

console.log('Models: ', acmeDB.models);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
