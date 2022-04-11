const queryDB = async (pool, SQLquery, method) => {
  const result = { status: 'ok' };
  try {
    result.data = await pool.query(SQLquery);
    if (method === 'GET' && !result.data.length) result.info = 'no data';
    if (method === 'DELETE' && result.data.affectedRows) result.info = 'data deleted';
    return result;
  } catch (e) {
    result.status = 'error';
    result.info = `${e.name}: ${e.message}`;
    return result;
  }
};

module.exports = queryDB;
