
//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../Server';
chai.use(chaiHttp)
const should = chai.should();

describe('/GET data from accounts', () => {
  it('should return the list of accounts', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the list of accounts', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts?status=active')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the list of accounts', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts?status=dormant')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the error ', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts?status=none')
      .set('token', token)
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
  ];

  it('should return the information of created account', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/accounts')
      .set('token', token)
      .send(data[0])
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        res.body.should.have.property('status').that.equals(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the information of created account', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/accounts')
      .set('token', token)
      .send(data[1])
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        res.body.should.have.property('status').that.equals(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return an error as data passed are not full', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/accounts')
      .set('token', token)
      .send(data[2])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error');
        done();
      });
  });
})

describe('/GET data of one account from accounts', () => {
  it('should return the information of one accounts', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts/13')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return the information of one accounts', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts/19')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return an error as account number is not in database', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts/3456789')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(404);
        res.body.should.have.property('status').that.equals(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return the error as the parameter passed is not a number ', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts/aq345')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error').that.equals('bad request');
        done();
      });
  });
})
describe('/DELETE data from accounts table', () => {
  it('should return that the account was deleted', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .delete('/accounts/29')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('message').that.equals("account was succesfully deleted");
        done();
      });
  });
  it('should return an error as account number is not in database', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts/3456789')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(404);
        res.body.should.have.property('status').that.equals(404);

        done();
      });
  });
  it('should return the error as the parameter passed is not a number ', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/accounts/aq345')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error').that.equals('bad request');
        done();
      });
  });
})

describe('/PATCH data in accounts table', () => {
  it('should return that the account status was changed', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .patch('/accounts/35')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data')
        done();
      });
  });
  it('should return an error as account number is not in database', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .patch('/accounts/3456789')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(404);
        res.body.should.have.property('status').that.equals(404);
        res.body.should.have.property('error').that.equals('account number not found');
        done();
      });
  });
  it('should return that the account status was changed', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .patch('/accounts/20')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data')
        done();
      });
  });
})
