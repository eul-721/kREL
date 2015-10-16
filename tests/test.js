var assert = require('assert'),
supertest = require('supertest'),
fs = require('fs'),
path = require('path'),
chance = new (require('chance'))();

var KREL_URL = "http://localhost:8080";


var testAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname,'testAccount.json'))
);



describe('Auth',function(){
  describe("login", function(){
    it("should be able to login with registered accounts", function(done){
      supertest("http://localhost:8080")
      .post('/login')
      .send(testAccount)
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        done();
      })

    })
  });

  describe("register", function(){
    it("Should be able to register account and login", function(done){
      var account = {
        username : chance.word(),
        password : chance.hash({length: 10})
      };

      supertest(KREL_URL)
      .post('/register')
      .send(account)
      .expect(200, function(){
        supertest(KREL_URL)
        .post('/login')
        .send(account)
        .expect(200)
        .end(function(err, res){
          if(err) return done(err);
          done();
        })
      });


    })
  })
});
