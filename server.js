const express = require( 'express' );
const server = express();
const acmeDB = require( './db' );
const methodOverride = require( 'method-override' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const swig = require( 'swig' );

swig.setDefaults({ cache: false });
server.set( 'view engine', 'html' );
server.engine( 'html', swig.renderFile );

server.use(bodyParser.urlencoded({ extended: false }));
server.use(methodOverride( '_method' ))

server.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
server.use('/css', express.static(path.join(__dirname, './css')));
server.use('/departments', require('./routes/departments'));
server.use('/users', require('./routes/users'));

server.get('/', (req, res, next) => {
    Promise.all([
        acmeDB.models.Department.findAll(),
        acmeDB.models.User.findAll({
        })
    ])
    .then((nestedArr) => {
        res.render('index', {departments: nestedArr[0], users: nestedArr[1]} )
    })
    .catch(next);
});

acmeDB.seed()
    .then(() => console.log('your data is seeded'))
    .catch( err => console.log(err));

console.log('Models: ', acmeDB.models);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));
