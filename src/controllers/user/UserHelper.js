const parse = (fields) => {
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

export {parse};
