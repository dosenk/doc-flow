module.exports = class ApiError extends Error {
  status;

  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorisedError(msg) {
    return new ApiError(401, msg || 'неправильный логин или пароль');
  }

  static NopermissionError(msg) {
    return new ApiError(403, msg || 'недостаточно прав');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
