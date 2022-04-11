const db = require('../db/connection');
const queryDB = require('../db/query');

exports.getAllBase = (req, res) => {
  const SQLquery = `SELECT * FROM base`;
  queryDB(db.pool, SQLquery).then((data) => res(data));
};

exports.getBaseByNumber = (req, res) => {
  const { number } = req.params;
  const SQLquery = `SELECT * FROM base WHERE number = '${number}'`;
  queryDB(db.pool, SQLquery).then((data) => res(data));
};
