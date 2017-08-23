import express from 'express'
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

export default app;
