const expect = require('chai').expect;
const Sequelize = require( 'sequelize' );
const connectDB = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const acmeDB = new Sequelize(connectDB);

