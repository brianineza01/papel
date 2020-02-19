process.env.NODE_ENV = 'test';
//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../Server';
chai.use(chaiHttp)
const should = chai.should(); 
//Our parent block
  //testing login
  describe('/POST data ', () => {
    const user = [{
      "lastname": "MANISHIMWE",
      "firstname": "emy",
      "email": "me2001@gmail.com",
      "password": "12345",
      "type": "staff"
    },{
    "lastname": "UWAMAHORO",
    "firstname": "Clarisse",
    "email": "uc2001@gmail.com",
    "password": "12345",
    "type": "client"
    },{
    "lastname": "JOHN",
    "firstname": "Doe",
    "email": "jd@gmail.com",
    "password": "12345",
    "type": "staff"
    },{
    "lastname": "faustin",
    "firstname": "eric",
    "email": "fe2001@gmail.com",
    "password": "12345",
    "type": "staff"
    }
    ]


      it('should signup user', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(user[0])
          .end((err, res) => {
            chai.expect(res).to.have.status(201);
            done();
          });
      });

      it('should signup user', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(user[1])
          .end((err, res) => {
            chai.expect(res).to.have.status(201);
            done();
          });
      });

      it('should signup user', (done) => {
        chai.request(server)
          .post('/auth/signup')
          .send(user[2])
          .end((err, res) => {
            chai.expect(res).to.have.status(201);
            done();
          });
      });

  });
  