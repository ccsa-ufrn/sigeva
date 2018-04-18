module.exports = {
  application:
  {
    name: 'AppName',
    version: '0.0.1',
    url: 'http://localhost:3000',
    port: 3000,
  },
  mongo_connection: {
    development: 'mongodb://localhost/sigeva',
    test: 'mongodb://localhost/sigeva',
    production: 'mongodb://localhost/sigeva',
  },
  email: {
    user: 'email user',
    password: 'password',
  },
  secret: 'your_secret_here',
  file_dir: '/upload/file/here',
};
