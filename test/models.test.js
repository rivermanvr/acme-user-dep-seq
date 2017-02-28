const expect = require( 'chai' ).expect;
const acmeDB = require( '../db' );

describe('Models testing', () => {
     beforeEach((done) => {
        acmeDB.seed()
            .then(done())
            .catch(err => done(err));
     });
});
    describe('User table: test data and methods', () => {
        
    });





  describe('Story', ()=> {
    let stories;
    beforeEach((done)=> {
      db.models.Story.findAll()
        .then( _stories=> stories = _stories )
        .then( ()=> done())
        .catch( e => done(e));
    });

    describe('seeded data', ()=> {
      it('there are 4 stories', ()=> {
        expect(stories.length).to.equal(4);
      });
    });
  });

  describe('User', ()=> {
    it('exists', ()=> {
      expect(db.models.User).to.be.ok;
    });

    describe('seeded data', ()=> {
      let users;
      beforeEach((done)=> {
        db.models.User.findAll()
          .then( _users => users = _users)
          .then( ()=> done())  
          .catch( err=> done(err));
      });
      it('there are two users', ()=> {
        expect(users.length).to.equal(2);
      });
    });
  });
});