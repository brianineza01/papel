
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../Server';
chai.use(chaiHttp)
const should = chai.should();
describe('/POST data to SIGNUP', () => {
  const user = [{
    "lastname": "MANISHIMWE",
    "firstname": "emy",
    "email": "me2001@gmail.com",
    "password": "123456",
    "type": "admin"
  }, {
    "lastname": "UWAMAHORO",
    "firstname": "Clarisse",
    "email": "uc2001@gmail.com",
    "password": "123456",
    "type": "client"
  }, {
    "lastname": "JOHN",
    "firstname": "Doe",
    "email": "jd@gmail.com",
    "password": "123456",
    "type": "staff"
  }, {
    "lastname": "faustin",
    "firstname": "eric",
    "email": "fe2001@gmail.com",
    "type": "admin"
  },
  {
    "lastname": "faustin",
    "firstname": "eric",
    "type": "admin"
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
        res.body.should.have.property('status').that.equals(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return an error when data sent are not full ', (done) => {
    chai.request(server)
      .post('/auth/signup')
      .send(user[3])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        done();
      });
  });
  it('should return an error if the data sent are not full', (done) => {
    chai.request(server)
      .post('/auth/signup')
      .send(user[4])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
});

describe('/POST data to login ', () => {
  const user = [{
    "email": "me2001@gmail.com",
    "password": "123456",
  },
  {
    "email": "jd@gmail.com",
    "password": "123456",
  }, {
    "email": "fe2001@gmail.com",
  },{
    "email": "me2123451@gmail.com",
    "password": "123456",
  },
  {
    "email": "jd@gmail.com",
    "password": "1234564567",
  }
  ]
  it('should login a user', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(user[0])
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
  it('should login a user', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(user[1])
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return an error when there is a bad request ', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(user[2])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        done();
      });
  });
  it('should return an error when there is a wrong email ', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(user[3])
      .end((err, res) => {
        chai.expect(res).to.have.status(401);
        res.body.should.have.property('error').that.equals("authentication failed");
        done();
      });
  });
  it('should return an error when there is a wrong password ', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(user[4])
      .end((err, res) => {
        chai.expect(res).to.have.status(401);
        res.body.should.have.property('error').that.equals("authentication failed");
        done();
      });
  });
});
