const db = require('../db/connection');
const queryDB = require('../db/query');

exports.getAllOtm = (req, res) => {
  const SQLquery = 'SELECT * FROM otm_all_view';
  queryDB(db.pool, SQLquery).then((data) => res.send(data));
};

exports.getAllOtmByIdenty = (req, res) => {
  const { identy } = req.params;
  const SQLquery = `SELECT * FROM otm_all_view WHERE identifier = '${identy}', '%d.%m.%Y')`;
  queryDB(db.pool, SQLquery).then((data) => res(data));
};

exports.getActiveOtm = (req, res) => {
  const date = new Date().toLocaleDateString('ru-RU');
  const SQLquery = `SELECT * FROM otm_all_view WHERE endDate >= STR_TO_DATE('${date}', '%d.%m.%Y')`;
  queryDB(db.pool, SQLquery).then((data) => res(data));
};

exports.getActiveOtmByIdenty = (req, res) => {
  const { identy } = req.params;
  const date = new Date().toLocaleDateString('ru-RU');
  const SQLquery = `SELECT * FROM otm_all_view WHERE identifier = '${identy}' and endDate >= STR_TO_DATE('${date}', '%d.%m.%Y')`;
  queryDB(db.pool, SQLquery).then((data) => res(data));
};
