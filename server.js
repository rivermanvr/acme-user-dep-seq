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
const User_Dept = acmeDB.define('user_dept', {
    userID: acmeDB.Sequelize.INTEGER,
    deptID: acmeDB.Sequelize.INTEGER
});

User.hasMany(User_Dept);
Department.hasMany(User_Dept);

const sync = () => {
    return acmeDB.sync({ force: true });
};

const seed = () => {
    return sync()
        .then(() => User.create({name: 'Vince'}))
        .then(() => User.create({name: 'Gary'}))
        .then(() => User.create({name: 'Roy'}))
        .then(() => Department.create({name: 'Human Resources'}))
        .then(() => Department.create({name: 'Accounting'}))
        .then(() => Department.create({name: 'Information Technology'}))
};

seed()
    .then(() => console.log('your data is seeded'))
    .catch( err => console.log(err));

console.log('Models: ', acmeDB.models);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
