
//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../Server';
chai.use(chaiHttp)
const should = chai.should();

describe('/GET data from accounts', () => {
  it('should return the list of accounts', (done) => {
    chai.request(server)
      .get('/accounts')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the list of accounts', (done) => {
    chai.request(server)
      .get('/accounts?status=active')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the list of accounts', (done) => {
    chai.request(server)
      .get('/accounts?status=dormant')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the error ', (done) => {
    chai.request(server)
      .get('/accounts?status=none')
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error').that.equals('bad request');
        done();
      });
  });
})
describe('/ POST data to accounts', () => {
  const data = [
    {
      "date": "2019-04-24",
      "email": "me@gmail.com",
      "type": "current",
      "status": "active",
      "balance": 0
    },
    {
      "date": "2019-04-24",
      "email": "original@gmail.com",
      "type": "saving",
      "status": "dormant",
      "balance": 0
    },
    {
      "date": "2019-04-24",
      "email": "originalgmail.com",
      "type": "saving",
      "balance": 0
    }
  ]
  it('should return the information of created account', (done) => {
    chai.request(server)
      .post('/accounts')
      .send(data[0])
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        res.body.should.have.property('status').that.equals(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the information of created account', (done) => {
    chai.request(server)
      .post('/accounts')
      .send(data[1])
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        res.body.should.have.property('status').that.equals(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return an error as data passed are not full', (done) => {
    chai.request(server)
      .post('/accounts')
      .send(data[2])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error');
        done();
      });
  });
})
