// creating fild requests
db.fieldrequests.insertMany([
	{
		name: 'cpf',
		readableName: 'CPF',
		HTMLtype: 'number',
		editable: true,
		required: true
	},
	{
		name: 'institution',
		readableName: 'Instituição',
		HTMLtype: 'text',
		editable: true,
		required: true,
	},
	{
		telefone: 'phone',
		readableName: 'Telefone',
		HTMLtype: 'text',
		editable: true,
		required: true,
	}
]);

const requirementsId = db.fieldrequests.find({}, { _id: true }).map((a)=>a._id);

db.systems.insertOne({
	data: requirementsId,
	name: 'register_fields'
});
