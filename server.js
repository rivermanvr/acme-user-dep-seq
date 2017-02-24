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

const sync = () => {
    return acmeDB.sync({ force: true });
};

const seed = () => {
    return sync()
        .then();
};

seed()
    .then(() => console.log('your data is seeded'))
    .catch( err => console.log(err));

console.log('Models: ', acmeDB.models);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
