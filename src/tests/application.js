import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../controllers/App';

const should = chai.should;
const expect = chai.expect;

chai.use(chaiHttp);

describe('Testes do servidor', (done) => {
  let server;
  beforeEach(() => {
    server = app.listen(4000);
  });

  afterEach(() => {
    server.close();
  });

  it ('Rota inexistente', (done) => {
    chai.request(server)
      .get('/api/rota_inexistente')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.be.true;
        done();
      })
  });
});
