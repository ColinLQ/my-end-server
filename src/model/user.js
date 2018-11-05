const pool = require('../lib');
const { createToken } = require('../utils/token');

async function update(values, id) {
  const sql = `UPDATE users SET avatar = ?, nick_name = ?, gender = ?, mobile = ? WHERE id = ${id}`;
  const user = await pool.query(sql, values)
  return user;
}

async function createUser(openid) {
  const sql = 'INSERT INTO users set openid = ?';
  const { insertId } = await pool.query(sql, openid)
  return insertId;
}

async function login(openid) {
  const getUserSql = 'SELECT * FROM users WHERE openid = ?';

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

async function getUser(id) {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const data = await pool.query(sql, id)
  const user = data[0]
  if (!user) {
    throw {
      status: 404,
      message: '资源不存在！'
    }
  }
  delete user.openid;
  return user;
}

module.exports = {
  update,
  login,
  getUser,
}
