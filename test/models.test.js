const expect = require( 'chai' ).expect;
const acmeDB = require( '../db' );

describe('Models testing', () => {
    let userRecords;
    let deptRecords;
    let userDeptRec;
    beforeEach((done) => {
        acmeDB.seed()
            .then(acmeDB.models.User.findAll())
            .then( _userRecords => userRecords = _userRecords)
            .then(acmeDB.models.Department.findAll())
            .then( _deptRecords => deptRecords = _deptRecords)
            .then(acmeDB.models.UserDept.findAll())
            .then( _userDeptRec => userDeptRec = _userDeptRec)
            .catch( err => done(err));
        });

    describe('User table: test data and methods', () => {
        describe('seeded data check', () => {
            it('There are 4 users', () => {
                expect(userRecords.length).to.equal(4);
            })
        })
    });

    describe('Department table: test data and methods', () => {
        describe('seeded data check', () => {
            it('There are 4 Departments', () => {
                expect(deptRecords.length).to.equal(4);
            })
        })
    })
});
