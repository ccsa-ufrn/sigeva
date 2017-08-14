import seneca from 'seneca'

seneca()
	.client({type: 'tcp', pin:'role:user'})
	.act('role:user,cmd:create_new', console.log)
