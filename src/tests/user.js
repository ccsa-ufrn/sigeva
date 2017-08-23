import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../controllers/App'
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function() {
	it('Deve retornar 200', function(done) {
		chai.request(server)
		.get('/')
		.end(function(err, res) {
			res.should.have.status(200);
			done();
		})
	})
})
