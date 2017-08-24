/** Response Encapsulator
 * Every response must return a error field, expliciting if there is not errors. 
 */
const Response = (error, data, errorInfo="Sem mensagem de erro")=>{
	return({
		error: error,
		error_info: errorInfo,
		data: data
	});
};

export default Response;
