require('dotenv').config();

const db = require('../db/connection');
const queryDB = require('../db/query');
const ApiError = require('../exceptions/api.error');
const {
  handleAddUser,
  handleLogin,
  handleLogout,
  handleRefresh
} = require('../services/user.service');

exports.login = async function (req, res, next) {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      throw ApiError.BadRequest('Заполните все поля');
    }
    const userData = await handleLogin(login, password);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const info = await handleLogout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(info);
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await handleRefresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { pass, login, role, fullName } = req.body;
    const user = await handleAddUser(pass, login, role, 1, fullName);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.delUser = (req, res, next) => {
  try {
    const { login } = req.body;
    console.log(req.body, req.url, req.params);
    if (login) {
      const SQLquery = `DELETE from users WHERE login = "${login}";`;
      queryDB(db.pool, SQLquery, 'DELETE').then((data) => {
        res.send(data);
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = (req, res) => {
  const SQLquery = `SELECT * FROM users_view`;
  queryDB(db.pool, SQLquery).then((ress) => {
    res.json(ress);
  });
};
