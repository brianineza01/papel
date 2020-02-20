
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
