const pool = require('../lib');
const { createToken } = require('../utils/token');

const createSql = 'INSERT INTO users set avatar = ?, nick_name = ?, gender = ?, mobile = ?';

const getUserSql = 'SELECT * FROM users WHERE openid = ?';

function update(values) {
  pool.query(createSql, values)
}

async function createUser(openid) {
  const sql = 'INSERT INTO users set openid = ?';
  const { insertId } = await pool.query(sql, openid)
  return insertId;
}

async function login(openid) {
  const data = await pool.query(getUserSql, openid)
  let userId;
  if (!data.length) {
    userId = await createUser(openid)
  } else {
    userId = data[0].id;
  }
  const token = await createToken(userId);
  return { token };
}

module.exports = {
  update,
  login,
}
