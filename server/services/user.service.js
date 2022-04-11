const bcrypt = require('bcrypt');
const queryDB = require('../db/query');
const db = require('../db/connection');
const tokenService = require('./token.service');
const ApiError = require('../exceptions/api.error');
const { getHash } = require('../utils/utils');

class UserService {
  async handleLogin(login, pass) {
    if (pass && login) {
      const SQLquery = `SELECT users.id AS id, users.login AS login, users.password AS password,
                        users.fullName AS fullName, user_role.value AS role, user_status.value AS status
                        FROM ((users
                          LEFT JOIN user_role
                            ON (users.role = user_role.id))
                          LEFT JOIN user_status
                            ON (users.status = user_status.id))
                        WHERE login = '${login}'`;
      const { data } = await queryDB(db.pool, SQLquery);
      const isTruePass = data.length ? bcrypt.compareSync(pass, data[0]?.password) : false;
      if (!isTruePass) throw ApiError.BadRequest('Неправильный логин или пароль');
      const result = await tokenService.createToken.call(tokenService, data[0]);
      return result;
    }
  }

  async handleAddUser(pass, login, role, active, fullName) {
    if (pass && login && role) {
      const passHash = getHash(pass);
      const SQLquery = `SELECT * FROM users WHERE login = '${login}'`;
      const { data } = await queryDB(db.pool, SQLquery);
      if (data.length) {
        throw ApiError.BadRequest('Пользователь с таким логином существует');
      }
      const queryAddUser = `INSERT INTO users (login, password, role, active, fullName)
                                VALUES ('${login}', '${passHash}', (SELECT id FROM user_role WHERE value = '${role}'), '${
        active ? '1' : '0'
      }', '${fullName ?? ''}')`;
      const user = await queryDB(db.pool, queryAddUser);
      return user;
    }
  }

  async handleLogout(refreshToken) {
    const info = await tokenService.removeToken(refreshToken);
    return info;
  }

  async handleRefresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorisedError('Истекло время сессии');
    }
    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);
    console.log(!tokenFromDb);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorisedError('Истекло время сессии');
    }
    const { data } = await queryDB(db.pool, `SELECT * FROM users_view WHERE id = '${userData.id}'`);
    const result = await tokenService.createToken(data[0]);
    return result;
  }
}

module.exports = new UserService();
