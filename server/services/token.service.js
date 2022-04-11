const jwt = require('jsonwebtoken');
const queryDB = require('../db/query');
const db = require('../db/connection');
const UserDto = require('../dtos/user.dto');
require('dotenv').config();

class TokenService {
  generateTokens(payload) {
    try {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '10m'
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '1h'
      });

      return {
        accessToken,
        refreshToken
      };
    } catch (error) {
      throw new Error('Ошибка генерации токена');
    }
  }

  async saveToken(userId, refreshToken) {
    try {
      const SQLquery = `SELECT * FROM user_tokens WHERE userId = '${userId}'`;
      const { data } = await queryDB(db.pool, SQLquery, 'GET');
      if (data.length) {
        const sql = `UPDATE user_tokens SET token = '${refreshToken}' WHERE userId = '${userId}'`;
        const result = await queryDB(db.pool, sql);
        return result;
      }
      const sqlAddToken = `INSERT into user_tokens (userId, token) VALUES ('${userId}', '${refreshToken}')`;
      const token = await queryDB(db.pool, sqlAddToken);
      return token;
    } catch (error) {
      throw new Error('Ошибка сохранения/обновления токена');
    }
  }

  async removeToken(refreshToken) {
    const SQLquery = `DELETE FROM user_tokens WHERE token = '${refreshToken}'`;
    const delData = await queryDB(db.pool, SQLquery);
    if (delData.data.affectedRows) return { ...delData, info: 'user is logouted' };
    return { ...delData, info: 'user is already logged out' };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(token) {
    try {
      const SQLquery = `SELECT * FROM user_tokens WHERE token = '${token}'`;
      const { data } = await queryDB(db.pool, SQLquery);
      return data.length ? true : null;
    } catch (error) {
      throw new Error('Токен не найден');
    }
  }

  async createToken(user) {
    const userDto = new UserDto(user);
    const tokens = this.generateTokens({ ...userDto });
    await this.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new TokenService();
