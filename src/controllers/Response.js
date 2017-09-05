/** Response Encapsulator
 * Every response must return a error field, expliciting if there is not errors.
 */
const Response = (error, data, errorInfo = 'Sem mensagem de erro') => {
  const response = {
    error,
    error_info: errorInfo,
    data,
  };
  return response;
};

export default Response;
