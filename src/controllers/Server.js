import app from './App'
import {application} from '../../config'

console.log(`Application enviroment is ${process.env.NODE_ENV}`);

// STARTS THE SERVER
app.listen(application.port, () => {
	console.log(`Starting Express ${application.name} ${application.version} at ::${application.port}`);
})
