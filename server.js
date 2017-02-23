const express = require('express');
const server = express();
const Sequelize = require('sequelize');

const connectDB = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const acmeDB = new Sequelize(connectDB);

const Department = acmeDB.define('department', {

});
const User = acmeDB.define('user', {

});

acmeDB.sync({ force: true })
    .catch( err => console.log(err));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
