
//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../Server';
chai.use(chaiHttp)
const should = chai.should();
const data = [
  {
    "amount": 50000
  },
  {
    "amount": 5000
  },
  {
    "amount": '2000fasfg'
  },
  {
    "amount": '200'
  }
];
describe('/ POST data to transactions/credit ', () => {
  it('should return the information of the credit transaction', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/transactions/30/credit')
      .set('token', token)
      .send(data[0])
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        res.body.should.have.property('status').that.equals(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return an error as the account number passed is  a string', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/transactions/35eaa/credit')
      .set('token', token)
      .send(data[1])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return an error as an amount passed is a string', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/transactions/34/credit')
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

describe('/ POST data to transactions/debit ', () => {
  it('should return the information of the debit transaction', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/transactions/30/debit')
      .set('token', token)
      .send(data[3])
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        res.body.should.have.property('status').that.equals(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return an error as someone is crediting an account which have 0 balance', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/transactions/41/debit')
      .set('token', token)
      .send(data[2])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return an error as the account number passed is a string', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/transactions/35cfrcx/debit')
      .set('token', token)
      .send(data[1])
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return an error as an amount passed is a string', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .post('/transactions/34/debit')
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

describe('/GET transaction history of one account from transactions', () => {
  it('should return the transactions of one accounts', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/transactions/02')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        res.body.should.have.property('status').that.equals(200);
        res.body.should.have.property('data');
        done();
      });
  });
  it('should return an error as account number is not found in database', (done) => {
    const token = process.env.TOKEN;
    chai.request(server)
      .get('/transactions/3456789')
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
      .get('/transactions/aq346754')
      .set('token', token)
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        res.body.should.have.property('status').that.equals(400);
        res.body.should.have.property('error').that.equals('Bad request');
        done();
      });
  });
})
