module.exports = {
  application:
  {
    name: 'AppName',
    version: '0.0.1',
    url: 'http://localhost:3000',
    port: 3000,
  },
  mongo_connection: {
    development: 'mongodb://localhost/sigeva_dev',
    test: 'mongodb://localhost/sigeva_test',
    production: 'mongodb://localhost/sigeva',
  },
  secret: 'your_secret_here',
  file_dir: '/absolute/path/to/file/directory',
};
