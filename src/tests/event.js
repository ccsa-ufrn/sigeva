import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../controllers/App';
import eventModel from '../models/event.model';

const should = chai.should;
const expect = chai.expect;

chai.use(chaiHttp);

describe('Event', () => {
  describe('POST /api/event', () => {
    let server;
    beforeEach(() => {
      server = app.listen(4000);
    });

    afterEach(() => {
      server.close();
    });

    it('Quando tentar acessar a rota por GET deve retornar erro', (done) => {
      chai.request(server)
        .get('/api/event/')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('Quando tentar criar um evento sem nenhum campo deve retornar erro', (done) => {
      chai.request(server)
        .post('/event/')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.not.be.undefined;
          expect(res.body.error).to.be.true;
          expect(res.body.error_info).to.not.be.undefined;
          expect(res.body.data).to.be.empty;
          done();
        });
    });

    it('Quando tentar criar um evento incompleto deve retornar erro', (done) => {
      chai.request(server)
        .post('/event/')
        .set('Content-Type', 'application/json')
        .send({ name: 'incompleto' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.true;
          expect(res.body.data).to.be.empty;
          done();
        });
    });

    it ('Quando passar valores vazios deve retornar erro', (done) => {
      chai.request(server)
        .post('/event/')
        .set('Content-Type', 'application/json')
        .send({ name: '', subtitle: '' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.true;
          expect(res.body.error_info).to.not.be.undefined;
          expect(res.body.data).to.not.be.empty;
          expect(res.body.data[0]).to.have.property('field');
          expect(res.body.data[0]).to.have.property('message');
          done();
        });
    });

  });
});
