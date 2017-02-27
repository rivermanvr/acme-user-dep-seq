const express = require( 'express' );
const server = express();
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

server.get('/', (req, res, next) => {
    Department.findAll({
        include: [UserDept]
    })
    .then(departments => res.render('index', {departments} ))
    .catch(next);
})


const Department = acmeDB.define('department', {
    name: acmeDB.Sequelize.STRING
}, {
    instanceMethods: {
        hasMultipleUsers: function () {
            return this.user_depts.length >1;
            }
        }
    });

const User = acmeDB.define('user', {
    name: acmeDB.Sequelize.STRING
});
const UserDept = acmeDB.define('user_dept', {});

User.hasMany(UserDept);
Department.hasMany(UserDept);
UserDept.belongsTo(User);
UserDept.belongsTo(Department);

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
        })
};

seed()
    .then(() => console.log('your data is seeded'))
    .catch( err => console.log(err));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));

console.log('Models: ', acmeDB.models);
