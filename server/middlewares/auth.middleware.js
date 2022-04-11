const ApiError = require('../exceptions/api.error');
const tokenService = require('../services/token.service');
const { regAccessUrls } = require('./constatnts');

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const url = req.originalUrl;

    if (!authorizationHeader) {
      throw ApiError.UnauthorisedError('авторизуйтесь');
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      throw ApiError.UnauthorisedError('авторизуйтесь');
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw ApiError.UnauthorisedError('авторизуйтесь');
    }

    if (userData.role === 'Регистратор' && !regAccessUrls.includes(url)) {
      throw ApiError.NopermissionError('Недостаточно прав');
    }

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};
