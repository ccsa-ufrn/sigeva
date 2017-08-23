import app from './App'
import {application} from '../../config'

// STARTS THE SERVER
app.listen(application.port, () => {
	console.log(`Starting Express ${application.name} ${application.version} at ::${application.port}`);
})
