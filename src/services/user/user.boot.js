import seneca from 'seneca'
import user from './user.service.js'

seneca()
	.use(user)
	.listen({type: 'tcp', pin: 'role:user'})
