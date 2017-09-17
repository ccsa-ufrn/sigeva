import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import app from '../controllers/App';
import userModel from '../models/user.model';

const should = chai.should;
const expect = chai.expect;

chai.use(chaiHttp);

describe('User', () => {
  let server;
  beforeEach(() => {
    userModel.remove({}, () => {
      const senha = bcrypt.hashSync('senha', 10);
      const user  = new userModel({ name: 'Teste', email: 'teste@hot.com', password:senha});
      user.save(() => { });
    }); // Remove all users from the collection
    server = app.listen(4000);
  });

  afterEach(() => {
    server.close();
  });

  describe('POST /api/user', () => {
    it('Deve criar um usuário simples', (done) => {
      const usuario = {
        name: 'Maradona',
        email: 'maradona.morais@hotmail.com',
        password: 'morais'
      };
      chai.request(server)
        .post('/api/user')
        .set('Content-Type', 'application/json')
        .send(usuario)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.error).to.be.false;
          expect(res.body.data).to.not.be.empty;
          expect(res.body.data.name).to.be.equal(usuario.name);
          expect(res.body.data.email).to.be.equal(usuario.email);
          done();
        })
    });

    it('Não deve criar usuário com campos faltando', (done) => {
      chai.request(server)
        .post('/api/user')
        .set('Content-Type', 'application/json')
        .send({ name: 'incompleto' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.true;
          expect(res.body.data).to.not.be.empty;
          expect(res.body.data[0]).to.have.property('field');
          expect(res.body.data[0]).to.have.property('message');
          done();
        })
    });

    it('Não deve criar usuário com email existente', (done) => {
      chai.request(server)
      .post('/api/user')
      .set('Content-Type', 'application/json')
      .send({ name: 'Maradona', password:'morais', email: 'teste@hot.com' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.true;
        expect(res.body.data).to.not.be.empty;
        expect(res.body.data[0]).to.have.property('field');
        expect(res.body.data[0]).to.have.property('message');
        done();
      });

    });
  });

  describe('POST /api/user/authorize',() => {
    describe('Authenticating Users', () => {
      it('Deve autenticar um usuário', () => {
        chai.request(server)
        .post('/api/user/authorize')
        .set('Content-Type', 'application/json')
        .send({ email: 'teste@hot.com', password:'senha' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.error).to.be.false;
          expect(res.body.data).to.not.be.empty;
          expect(res.body.data).to.have.property('token');
          done();
        });
      });
      it('should not authenticate unactivated user');
      it('should not authenticate wrongs credentials/inexisting users');
    });
  });
});



  // describe('Deactivating a User', () => {
  //   it('should desable a user');
  //   it('should not disable a user if he is the last administrator');
  //   it('should not disable a user if he is the last event coordinator');
  // });

  // describe('Editing a User', () => {
  //   it('should edit user fields');
  //   it('should not edit password without actual password verification');
  //   it('should not edit extraneous fields from user');
  //   it('should not be edited by other user unless the own or administrator');
  // });

  // describe('Getting a User by ID', () => {
  //   it('should return a user');
  //   it('should return a error if user doesn\'t exists');
  // });

  // describe('Getting all Users', () => {
  //   it('should return a set of users');
  //   it('should return only enrolled users if the requester is a event coordinator');
  //   it('should return all users if the requester is a administrator');
  // });
