import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../Server';
chai.use(chaiHttp)

const should = chai.should();
describe('/GET data of one account from accounts using user route', () => {
    it('should return the information of one accounts', (done) => {
        const token = process.env.TOKEN;
        chai.request(server)
            .get('/user/me@gmail.com/accounts')
            .set('token', token)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                res.body.should.have.property('status').that.equals(200);
                res.body.should.have.property('data');
                done();
            });
    });
    it('should return an error as user email is not in database', (done) => {
        const token = process.env.TOKEN;
        chai.request(server)
            .get('/user/online@gmail.com/accounts')
            .set('token', token)
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
                res.body.should.have.property('status').that.equals(404);
                res.body.should.have.property('error');
                done();
            });
    });
})