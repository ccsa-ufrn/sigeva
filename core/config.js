module.exports = {
	APP_NAME: "Sistema de Gestão de Eventos Acadêmicos", // Aplication name
	SERVER_PORT: 3000, // Port to start the server
	MONGO_DB_PRODUCTION: "mongodb://localhost/seminario",
	MONGO_DB_DEV: "mongodb://localhost/seminario_dev",
	MONGO_DB_TEST: "mongodb://localhost/seminario_test", // Mongo database test
	JWT_KEY: "VLAYZPn78JEdwQkk5aps7fCrzMUKbPDHr4xfvwYt", // JSON Web Token private Key
	HOST: "http://localhost:3000",
	INTERNAL_HOSTS: ['http://localhost:8080','http://localhost:3000']
};
