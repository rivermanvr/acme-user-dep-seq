const Sequelize = require( 'sequelize' );

const connectDB = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const acmeDB = new Sequelize(connectDB);

module.exports = acmeDB;
