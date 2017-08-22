import express from 'express'
import {application} from '../../config';
import connector from './MongoConnector';

// IMPORT ROUTERS
import userRouter from './user/UserRouter';

const app = express()
connector() // Execute connection to database

// ROUTINGS
app.get('/', (req, res) => {
	res.json({foo: "bar"});
})

app.use('/user', userRouter)

// STARTS THE SERVER
app.listen(application.port, () => {
	console.log(`Starting Express ${application.name} ${application.version} at ::${application.port}`);
})
