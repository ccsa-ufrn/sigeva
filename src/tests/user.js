import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../controllers/App'
var should = chai.should();

chai.use(chaiHttp);

describe('Creating a User', () => {
	it('should create a simple new user');
	it('should not create with missing fields');
	it('should not accept extraneous fileds');
	it('should not create a user with incorrect types in fields');
	it('should not create a user if alredy exists a user with email');
});

describe('Deactivating a User',() => {
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
