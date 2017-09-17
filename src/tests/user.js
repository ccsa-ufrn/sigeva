import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../controllers/App';
import eventModel from '../models/event.model';

const should = chai.should;
const expect = chai.expect;

chai.use(chaiHttp);

describe('User', () => {
  describe('POST /api/user', () => {
    let server;
    beforeEach(() => {
      server = app.listen(4000);
    });

    afterEach(() => {
      server.close();
    });

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
        })
    });
    it('should not create with missing fields');
    it('should not accept extraneous fileds');
    it('should not create a user with incorrect types in fields');
    it('should not create a user if alredy exists a user with email');
  });

  describe('Deactivating a User', () => {
    it('should desable a user');
    it('should not disable a user if he is the last administrator');
    it('should not disable a user if he is the last event coordinator');
  });

  describe('Editing a User', () => {
    it('should edit user fields');
    it('should not edit password without actual password verification');
    it('should not edit extraneous fields from user');
    it('should not be edited by other user unless the own or administrator');
  });

  describe('Getting a User by ID', () => {
    it('should return a user');
    it('should return a error if user doesn\'t exists');
  });

  describe('Getting all Users', () => {
    it('should return a set of users');
    it('should return only enrolled users if the requester is a event coordinator');
    it('should return all users if the requester is a administrator');
  });

  describe('Authenticating Users', () => {
    it('should authenticate a user');
    it('should not authenticate unactivated user');
    it('should not authenticate wrongs credentials/inexisting users');
  });

});
