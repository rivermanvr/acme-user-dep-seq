const acmeDB = require( './db' );
const Department = require( './Department' );
const User = require( './User' );
const UserDept = require( './UserDept' );

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
                Department.addDeptName('Human Resources'),
                Department.addDeptName('Security'),
                Department.addDeptName('Information Technology'),
                Department.addDeptName('Production')
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

module.exports = {
    models: {
        Department,
        User,
        UserDept
    },
    seed,
    sync
};
