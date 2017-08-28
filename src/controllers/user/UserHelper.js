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
 * @deprecated User fields are not working the same way
 */
const formatUser = (userObject, fields) => {
	let parsedUser = {};
	fields.forEach((field)=>{
		if (field != "password")
			parsedUser[field] = userObject[field]
	});
	return parsedUser;
};

/**
 * Validates a email address
 */
const isEmail = (email) => {
	return /\S+@\S+\.\S+/.test(email);
};

/**
 * Validates a password field
 */
const isPassword = (password) => {
	password = password.trim();
	if (password.length <= 5) return false;
	return true;
}

export {parseFields, formatUser, isEmail, isPassword};
