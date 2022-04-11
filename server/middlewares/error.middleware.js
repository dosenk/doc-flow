const ApiError = require('../exceptions/api.error');

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    if (err.status === 401) res.clearCookie('refreshToken');
    return res.status(err.status).json({
      status: 'error',
      data: err.message,
      info: err.errors
    });
  }
  return res.status(500).json({
    status: 'error',
    data: err.message ? err.message : 'Непредвиденная ошибка'
  });
};
