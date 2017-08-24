import express from 'express';
import bodyParser from 'body-parser';
import connector from './MongoConnector';

// IMPORT ROUTERS
import userRouter from './user/UserRouter';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// Execute connection to database
connector();

// ROUTINGS
app.get('/', (req, res) => {
	res.json({foo: "bar"});
})

app.use('/user', userRouter);

export default app;
