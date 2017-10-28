/** Error Encapsulator
 * Must be used to encapsulate a error of form filling
 */
const FieldError = (field, message) => {
  const error = {
    field,
    message,
  };
  return error;
};

export default FieldError;
