/**
 * Parses a field request to a MongoDB friendly request. E.g.: 'name,password,email' => 'name email'
 */
const parseFields = (fields) => {
		let fieldsStr = '';
		const fieldsArray = fields.split(',');
		fieldsArray.forEach((f) => {
			if (f != 'password') {
				fieldsStr = fieldsStr.concat(f);
				fieldsStr = fieldsStr.concat(' ');
			}
		});
		return fieldsStr;

};

/**
 * Extracts from userObject only defined fields
 */
const formatUser = (userObject, fields) => {
	let parsedUser = {};
	fields.forEach((field)=>{
		if (field != "password")
			parsedUser[field] = userObject[field]
	});
	return parsedUser;
}

export {parseFields, formatUser};
